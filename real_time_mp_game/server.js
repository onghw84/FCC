require('dotenv').config({path:__dirname+'/sample.env'});
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');
const helmet = require('helmet');
const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Socket.io setup:
const Player = require('./public/Player');
const Collectible = require('./public/Collectible');
const {dimension} = require('./public/dimension');

let players = {};
let [cX,cY] = getRandomPosition();
let collectible = new Collectible({x:cX,y:cY,value:Math.ceil(Math.random()*3), id:Date.now()})

const io = socket(server);
io.sockets.on('connection', socket => {
  console.log(`${socket.id} connected`);
  let [positionX,positionY] = getRandomPosition();
  let player = new Player({x:positionX,y:positionY,score:0,id:socket.id});
  players[socket.id] = player;
  console.log(`Total number of players: ${Object.keys(players).length}`);

  socket.emit('init', {player: player, collectible: collectible});
  socket.emit('update', {players: players, collectible: collectible});

  //receive movement update from player
  socket.on('move', (playerT) => {
    players[socket.id].x = playerT.x;
    players[socket.id].y = playerT.y;
    player.x = playerT.x;
    player.y = playerT.y;
    
    if (player.collision(collectible)) {
      player.score += collectible.value;
      [cX,cY] = getRandomPosition();
      collectible = new Collectible({x:cX,y:cY,value:Math.ceil(Math.random()*3), id:Date.now()})
      players[socket.id].score = player.score;
    }

    //broadcast player's movement update to all players
    io.emit('update', {players: players, collectible: collectible});
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    delete players[socket.id];
    console.log(`Total number of players: ${Object.keys(players).length}`);
    io.emit('update', {players: players, collectible: collectible});
  });
});

function getRandomPosition(){
  let x = dimension.arenaminX + Math.floor(Math.random()*(dimension.arenaSizeX - 2*dimension.radius)) + dimension.radius;
  let y = dimension.arenaminY + Math.floor(Math.random()*(dimension.arenaSizeY - 2*dimension.radius)) + dimension.radius;
  return [x,y];
}

module.exports = app; // For testing

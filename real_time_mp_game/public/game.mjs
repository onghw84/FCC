import Player from './Player.mjs';
import { dimension } from './dimension.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

// Prepare canvas
context.clearRect(0, 0, canvas.width, canvas.height);
// Set background color
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);
// Create border for play field
context.strokeStyle = '#45b6fe';
context.strokeRect(dimension.arenaminX, dimension.arenaminY, dimension.arenaSizeX, dimension.arenaSizeY);
// Controls text
context.fillStyle = '#45b6fe';
context.font = "bold 26px Garamond";
context.textAlign = 'center';
context.fillText('Controls: WASD', 100, 30);
// Game title
context.font = "bold 34px Garamond";
context.fillText('Coin Race', canvas.width/2, 30);

let meImage = new Image();
let otherImage = new Image();
let collectibleImage = [new Image(), new Image(), new Image()];

let collectibleEntity;
let playerEntity;
let playersEntity;

// get images
meImage.src = 'public/img/dog.png';
otherImage.src = 'public/img/cat.png';
collectibleImage[0].src = 'public/img/bronze.png';
collectibleImage[1].src = 'public/img/silver.png';
collectibleImage[2].src = 'public/img/gold.png';

// create user
socket.on('init', ({ player, collectible }) => {
  playerEntity = new Player(player);

  document.onkeydown = e => {
    let dir = null;
    switch(e.key) {
      case "w":
      case "W":
      case "ArrowUp":
          dir = 'up';
          break;
      case "s":
      case "S":
      case "ArrowDown":
          dir = 'down';
          break;
      case "a":
      case "A":
      case "ArrowLeft":
          dir = 'left';
          break;
      case "d":
      case "D":
      case "ArrowRight":
          dir = 'right';
          break;   
    }
    if (dir) {
      playerEntity.movePlayer(dir, 10);
      //send movement update
      socket.emit('move', playerEntity);
    }
  }

  //receive update
  socket.on('update', ({players:players, collectible: collectible}) => {
    playerEntity.score = players[playerEntity.id].score;
    playersEntity = players;
    collectibleEntity = collectible;
    window.requestAnimationFrame(drawboard); 
  });

});

const drawboard = () => {
  // Redraw black on rank area
  context.fillStyle = 'black';
  context.fillRect(450, 0, dimension.arenamaxX, 40);  

  //Rank
  context.font = "bold 26px Garamond";
  context.fillStyle = '#45b6fe';
  context.fillText(playerEntity.calculateRank(Object.values(playersEntity)), 560, 30);

  // Redraw black on arena area
  context.fillStyle = 'black';
  context.fillRect(dimension.arenaminX, dimension.arenaminY, dimension.arenaSizeX, dimension.arenaSizeY);
  
  //Draw Players
  for (const [id, player] of Object.entries(playersEntity)) {
    if (id == playerEntity.id){
      draw(meImage, player);
    }
    else {
      draw(otherImage, player);
    }
  }
  
  //Draw collectible
  draw(collectibleImage[collectibleEntity.value-1], collectibleEntity);
}

function draw(img, item){
  context.drawImage(img, item.x-item.radius, item.y-item.radius, 2*item.radius, 2*item.radius);
}

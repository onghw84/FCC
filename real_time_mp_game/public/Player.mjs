import { dimension } from './dimension.mjs';

class Player {
  constructor({x, y, score, id, radius = dimension.radius}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
    this.radius = radius;
  }

  movePlayer(dir, speed) {
    if (dir == "up"){
      this.y = Math.max(dimension.arenaminY+this.radius, this.y - speed);
    }
    else if (dir =="down"){
      this.y = Math.min(dimension.arenamaxY-this.radius, this.y + speed);
    }
    else if (dir == "left"){
      this.x = Math.max(dimension.arenaminX +  this.radius, this.x - speed);
    }
    else {
      this.x = Math.min(dimension.arenamaxX-this.radius, this.x + speed);
    }
  }

  collision(item) {
    var dx = this.x - item.x;
    var dy = this.y - item.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius + item.radius) {
      return true;
    }
    return false;
  }

  calculateRank(arr) {
    var scores = arr.map((el) => {return el.score;})    
    var sorted_scores = scores.sort(function(a, b){return b - a});
    var currentRanking = sorted_scores.findIndex((el)=>{return this.score >= el})+1;
    return `Rank: ${currentRanking}/${arr.length}`;    
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Player;
} catch(e) {}

export default Player;

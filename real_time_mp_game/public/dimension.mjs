const canvasWidth = 640;
const canvasHeight = 480;
const border = 10;
const title = 40; 

const dimension = {
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
  arenaSizeX: canvasWidth - 2 * border,
  arenaSizeY: canvasHeight - 2 * border - title,
  arenaminX: border,
  arenaminY: border + title,
  arenamaxX: canvasWidth - border,
  arenamaxY: canvasHeight - border,
  radius: 20
}


export {
  dimension
}

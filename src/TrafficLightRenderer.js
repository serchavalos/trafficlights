const constants = require('./constants.js');
const TrafficLight = require('./TrafficLight.js');

class TrafficLightRenderer {
  constructor() {
    this.isVertical = false;
    this.isInverted = false;
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @return {TrafficLightRenderer}
   */
  setContext(context){
    this.context = context;

    return this;
  }

  /**
   * @param {boolean} isVertical
   */
  setVertical(isVertical) {
    this.isVertical = isVertical;
  }

  /**
   * @param {boolean} isInverted
   */
  setInverted(isInverted) {
    this.isInverted = isInverted;
  }

  /**
   * @param {TrafficLight} trafficLight
   * @param {array} coords [coordX, coordY>
   */
  render(light, coords) {
    if (
        !(light instanceof TrafficLight) ||
        !(Array.isArray(coords) && coords.length === 2)
        ) {
      throw new Error('Invalid arguments!');
    }
    let [coordX, coordY] = coords;
    let state = light.getState();

    this.context.lineWidth = 2;
    this.context.strokeStyle = '#333';

    this.context.beginPath();
    this.context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.GREEN ? constants.COLORS.GREEN : constants.COLORS.GRAY;
    this.context.fill();

    if (this.isVertical) {
      coordX += (this.isInverted ? -25 : 25);
    } else {
      coordY += (this.isInverted ? -25 : 25);
    }

    this.context.beginPath();
    this.context.moveTo(coordX, coordY);
    this.context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.TURN_LEFT ? constants.COLORS.TURN_LEFT : constants.COLORS.GRAY;
    this.context.fill();
    if (state == constants.STATE.TURN_LEFT) {
      this.context.fillStyle = 'white';
      this.context.font = '14px arial';
      this.context.fillText('L', coordX - 4, coordY + 5);
    }

    if (this.isVertical) {
      coordX += (this.isInverted ? -25 : 25);
    } else {
      coordY += (this.isInverted ? -25 : 25);
    }

    this.context.beginPath();
    this.context.moveTo(coordX, coordY);
    this.context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.YELLOW ? constants.COLORS.YELLOW : constants.COLORS.GRAY;
    this.context.fill();

    if (this.isVertical) {
      coordX += (this.isInverted ? -25 : 25);
    } else {
      coordY += (this.isInverted ? -25 : 25);
    }

    this.context.beginPath();
    this.context.moveTo(coordX, coordY);
    this.context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.RED ? constants.COLORS.RED : constants.COLORS.GRAY;
    this.context.fill();

    this.context.closePath();
  }
}

module.exports = TrafficLightRenderer;
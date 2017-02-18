const constants = require('./constants.js');
const TrafficLight = require('./TrafficLight.js');

class TrafficLightRenderer {

  /**
   * @param {CanvasRenderingContext2D} context
   * @return {TrafficLightRenderer}
   */
  setContext(context){
    this.context = context;

    return this;
  }

  /**
   * @param {TrafficLight} trafficLight
   * @param {integer} coordX
   * @param {integer} coordY
   */
  render(light, coordX, coordY) {
    if (
        !(light instanceof TrafficLight) ||
        !(typeof coordX === 'number') ||
        !(typeof coordY === 'number')
        ) {
      throw new Error('Invalid arguments: it requires an instance of TrafficLight');
    }
    let state = light.getState();

    this.context.lineWidth = 2;
    this.context.strokeStyle = '#333';

    this.context.beginPath();
    this.context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.GREEN ? constants.COLORS.GREEN : constants.COLORS.GRAY;
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(coordX, coordY + 25);
    this.context.arc(coordX, coordY + 25, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.TURN_LEFT ? constants.COLORS.TURN_LEFT : constants.COLORS.GRAY;
    this.context.fill();
    if (state == constants.STATE.TURN_LEFT) {
      this.context.fillStyle = 'white';
      this.context.font = '14px arial';
      this.context.fillText('<<', coordX - 9, coordY + 31);
    }

    this.context.beginPath();
    this.context.moveTo(coordX, coordY + 50);
    this.context.arc(coordX, coordY + 50, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.YELLOW ? constants.COLORS.YELLOW : constants.COLORS.GRAY;
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(coordX, coordY + 75);
    this.context.arc(coordX, coordY + 75, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = state == constants.STATE.RED ? constants.COLORS.RED : constants.COLORS.GRAY;
    this.context.fill();

    this.context.closePath();
  }
}

module.exports = TrafficLightRenderer;
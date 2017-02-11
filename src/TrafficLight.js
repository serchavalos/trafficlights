/**
 * @class TrafficLight
 */
class TrafficLight {
  /**
   * Inits the traffic light setting a cyclic link
   */
  constructor() {
    this.currentColor = TrafficLight.COLORS.RED;
    // Indicates the next traffic light.
    this.nextLight = this;
  }

  /**
   * Set the next light to set on green when this one goes red
   * @param {TrafficLight} trafficLight
   */
  setNextLight(trafficLight) {
    if (!(trafficLight instanceof TrafficLight)) {
      throw new Error('Invalid argument');
    }
    this.nextLight = trafficLight;
  }

  /**
   * Turn the green light on green and sets the timer
   */
  setOnGreen() {
    this.currentColor = TrafficLight.COLORS.GREEN;
    setTimeout(() => {
      this._setOnYellow();
    }, 8000);
  }

  /**
   * Turn the yellow light on green and sets the timer
   * @private
   */
  _setOnYellow() {
    this.currentColor = TrafficLight.COLORS.YELLOW;
    setTimeout(() => {
      this._setOnRed();
    }, 3000);
  }

  /**
   * Turn the red light on green and sets the timer
   * @private
   */
  _setOnRed() {
    this.currentColor = TrafficLight.COLORS.RED;
    this.nextLight.setOnGreen();
  }

  /**
   * Renders the traffic ligth on a given canvas
   * @param {integer} coordX
   * @param {integer} coordY
   * @param {CanvasRenderingContext2D} context
   */
  render(coordX, coordY, context) {
      context.lineWidth = 2;
      context.strokeStyle = '#333';

      context.beginPath();
      context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
      context.stroke();
      context.fillStyle = this.currentColor == TrafficLight.COLORS.GREEN ? TrafficLight.COLORS.GREEN : TrafficLight.COLORS.GRAY;
      context.fill();

      context.beginPath();
      context.moveTo(coordX, coordY + 25);
      context.arc(coordX, coordY + 25, 10, 0,  2 * Math.PI);
      context.stroke();
      context.fillStyle = this.currentColor == TrafficLight.COLORS.YELLOW ? TrafficLight.COLORS.YELLOW : TrafficLight.COLORS.GRAY;
      context.fill();

      context.beginPath();
      context.moveTo(coordX, coordY + 50);
      context.arc(coordX, coordY + 50, 10, 0,  2 * Math.PI);
      context.stroke();
      context.fillStyle = this.currentColor == TrafficLight.COLORS.RED ? TrafficLight.COLORS.RED : TrafficLight.COLORS.GRAY;
      context.fill();

      context.closePath();
  }
}

TrafficLight.COLORS = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
  GRAY: '#aaaaaa',
}

module.exports = TrafficLight;

const constants = require('./constants.js');

/**
 * @class TrafficLight
 */
class TrafficLight {
  /**
   * Inits the traffic light setting a cyclic link
   */
  constructor() {
    this.currentColor = constants.COLORS.RED;
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
    this.currentColor = constants.COLORS.GREEN;
    setTimeout(() => {
      this._setOnYellow();
    }, constants.TIMEOUT.GREEN);
  }

  /**
   * @return {string}
   */
  getColor() {
    return this.currentColor;
  }

  /**
   * Turn the yellow light on green and sets the timer
   * @private
   */
  _setOnYellow() {
    this.currentColor = constants.COLORS.YELLOW;
    setTimeout(() => {
      this._setOnRed();
    }, constants.TIMEOUT.YELLOW);
  }

  /**
   * Turn the red light on green and sets the timer
   * @private
   */
  _setOnRed() {
    this.currentColor = constants.COLORS.RED;
    this.nextLight.setOnGreen();
  }
}

module.exports = TrafficLight;

const constants = require('./constants.js');

/**
 * @class TrafficLight
 */
class TrafficLight {
  /**
   * Inits the traffic light setting a cyclic link
   */
  constructor() {
    this.state = constants.STATE.RED;
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
   * Sets the light on green and starts the timeout for the next state
   */
  startSequence() {
    this._setOnGreen();
  }

  /**
   * @return {string}
   */
  getState() {
    return this.state;
  }

  /**
   * Turn the green light on green and sets the timer
   * @private
   */
  _setOnGreen() {
    this.state = constants.STATE.GREEN;
    setTimeout(this._setOnTurnLeft.bind(this), constants.TIMEOUT.GREEN);
  }

  /**
   * Turn the green light on green and sets the timer
   * @private
   */
  _setOnTurnLeft() {
    this.state = constants.STATE.TURN_LEFT;
    setTimeout(this._setOnYellow.bind(this), constants.TIMEOUT.TURN_LEFT);
  }

  /**
   * Turn the yellow light on green and sets the timer
   * @private
   */
  _setOnYellow() {
    this.state = constants.STATE.YELLOW;
    setTimeout(this._setOnRed.bind(this), constants.TIMEOUT.YELLOW);
  }

  /**
   * Turn the red light on green and sets the timer
   * @private
   */
  _setOnRed() {
    this.state = constants.STATE.RED;
    this.nextLight.startSequence();
  }
}

module.exports = TrafficLight;

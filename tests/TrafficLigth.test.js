/* global describe before after it */
/* eslint-disable no-global-assign */

const assert = require('assert');
const constants = require('../src/constants.js');
const TrafficLight = require('../src/TrafficLight.js');

describe('TrafficLight', () => {
  const trafficLight = new TrafficLight();
  let timeLimit, setNextLightCallback, backupTimeoutFunction;

  before(() => {
    backupTimeoutFunction = setTimeout;
    // Add a spy on "setTimeout" function to make sure it will
    // execute the next light
    setTimeout = (inputCallback, inputTime) => {
      setNextLightCallback = inputCallback;
      timeLimit = inputTime;
    }
  });

  after(() => {
    setTimeout = backupTimeoutFunction;
  });

  describe('#startSequence', () => {
    it('should set current light on green and set the proper timing and callback', () => {
      trafficLight.startSequence();

      assert.equal(trafficLight.getState(), constants.STATE.GREEN);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, constants.TIMEOUT.GREEN);
    });

    it('should turn to "turn left" when the previous callback is executed', () => {
      setNextLightCallback.call(trafficLight);

      assert.equal(trafficLight.getState(), constants.STATE.TURN_LEFT);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, constants.TIMEOUT.TURN_LEFT);
    });

    it('should turn to yellow when the previous callback is executed', () => {
      setNextLightCallback.call(trafficLight);

      assert.equal(trafficLight.getState(), constants.STATE.YELLOW);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, constants.TIMEOUT.YELLOW);
    });
  });

  describe('#setNextLight', () => {
    it('should turn back to red and turn the next light green', () => {
      let nextLight = new TrafficLight();
      trafficLight.setNextLight(nextLight);
      setNextLightCallback.call(trafficLight);

      assert.equal(trafficLight.getState(), constants.STATE.RED);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, constants.TIMEOUT.GREEN);
      assert.equal(nextLight.getState(), constants.STATE.GREEN);
    });

    it('should throw an exception when a wrong object is passed', () => {
      let wrongLight = new Object();
      let wasExceptionThrown = false;
      let trafficLight = new TrafficLight();

      try {
        trafficLight.setNextLight(wrongLight);
      } catch (ex) {
        wasExceptionThrown = true;
      }

      assert.ok(wasExceptionThrown);
    });
  });
});

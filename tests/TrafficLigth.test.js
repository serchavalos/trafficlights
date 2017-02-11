/* global describe before after it */
/* eslint-disable no-global-assign */

const assert = require('assert');
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

  describe('#setOnGreen', () => {
    it('should set current light on green and set the proper timing and callback', () => {
      trafficLight.setOnGreen();

      assert.equal(trafficLight.currentColor, TrafficLight.COLORS.GREEN);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, 8000);
    });

    it('should turn to yellow when the previous callback is executed', () => {
      setNextLightCallback.call(trafficLight);

      assert.equal(trafficLight.currentColor, TrafficLight.COLORS.YELLOW);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, 3000);
    });
  });

  describe('#setNextLight', () => {
    it('should turn back to red and turn the next light green', () => {
      let nextLight = new TrafficLight();
      trafficLight.setNextLight(nextLight);
      setNextLightCallback.call(trafficLight);

      assert.equal(trafficLight.currentColor, TrafficLight.COLORS.RED);
      assert.equal(typeof setNextLightCallback, 'function');
      assert.equal(timeLimit, 8000);
      assert.equal(nextLight.currentColor, TrafficLight.COLORS.GREEN);
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

const assert = require('assert');
const TrafficLight = require('../src/TrafficLight.js');

describe('TrafficLight', () => {
  const trafficLight = new TrafficLight();

  describe('#setOnGreen', () => {
    let timeLimit, timeoutCallback, backupSteTimeout;

    before(() => {
      backupSteTimeout = setTimeout;
      setTimeout = (inputCallback, inputTime) => {
        timeoutCallback = inputCallback;
        timeLimit = inputTime;
      }

      trafficLight.setOnGreen();
    });

    after(() => {
      setTimeout = backupSteTimeout;
    });

    it('should set current color on green', () => {
      assert.equal(trafficLight.currentColor, TrafficLight.COLORS.GREEN);
    });

    it('should set a timeout with the proper timing', () => {
      assert.equal(typeof timeoutCallback, 'function');
      assert.equal(timeLimit, 8000);
    });

    it('should make the callback be the next color in place', () => {
      timeoutCallback.call(trafficLight);
      assert.equal(trafficLight.currentColor, TrafficLight.COLORS.YELLOW);
    });
  });
});
const assert = require('assert');
const Intersection = require('../src/Intersection.js');
const TrafficLight = require('../src/TrafficLight');


describe('Intersection', () => {
  const canvasMock = {
    getContext: function(){
      return {
        clearRect: function(){}
      }
    }
  };

  describe('#constructor', () => {
    it('should throw an exception with the wrong lights', () => {
      let wasExceptionThrown = false;
      const wrongLights = [new TrafficLight(), new TrafficLight(),new TrafficLight(),
        {} // wrong object passed
      ];

      try {
        const intersection = new Intersection(canvasMock, wrongLights);
      } catch (ex) {
        wasExceptionThrown = true;
      }

      assert.ok(wasExceptionThrown);
    });

    it('should throw an exception when there are no 4 lights', () => {
      let wasExceptionThrown = false;
      // Missing one light
      const wrongLights = [new TrafficLight(), new TrafficLight(), new TrafficLight()];

      try {
        const intersection = new Intersection(canvasMock, wrongLights);
      } catch (ex) {
        wasExceptionThrown = true;
      }

      assert.ok(wasExceptionThrown);
    });
  });

  describe('#render', () => {
    it('should call "render" method on all lights', () => {
      let counter = 0;
      let called = [false, false, false, false];
      TrafficLight.prototype.render = function() {
        called[counter++] = true;
      };

      const lights = [new TrafficLight(), new TrafficLight(), new TrafficLight(), new TrafficLight()]
      const intersection = new Intersection(canvasMock, lights);
      intersection.render();
      const wereAllLightsCalled = called.every(item => item);

      assert.ok(wereAllLightsCalled);
    });
  });
});

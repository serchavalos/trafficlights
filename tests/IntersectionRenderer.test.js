/* global describe setTimeout it */
/* eslint-disable no-unused-vars */

const assert = require('assert');
const IntersectionRenderer = require('../src/IntersectionRenderer.js');
const TrafficLight = require('../src/TrafficLight');
const TrafficLightRenderer = require('../src/TrafficLightRenderer');

describe('IntersectionRenderer', () => {
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
        let intersection = new IntersectionRenderer(canvasMock, wrongLights);
      } catch (ex) {
        wasExceptionThrown = true;
      }

      assert.ok(wasExceptionThrown);
    });

    it('should throw an exception with the wrong renderer for traffic lights', () => {
      let wasExceptionThrown = false;
      const lights = [new TrafficLight(), new TrafficLight(),new TrafficLight(), new TrafficLight()];
      const wrongRenderer = {}; // wrong object passed

      try {
        let intersection = new IntersectionRenderer(canvasMock, lights, wrongRenderer);
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
        let intersection = new IntersectionRenderer(canvasMock, wrongLights);
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
      let origRender = TrafficLightRenderer.prototype.render;

      // We mock the function to count the number of times called
      TrafficLightRenderer.prototype.render = function() {
        called[counter++] = true;
      };
      let renderer = new TrafficLightRenderer();

      const lights = [new TrafficLight(), new TrafficLight(), new TrafficLight(), new TrafficLight()];
      const intersection = new IntersectionRenderer(canvasMock, lights, renderer);
      intersection.render();
      const wereAllLightsCalled = called.every(item => item);

      assert.ok(wereAllLightsCalled);
      TrafficLightRenderer.prototype.render = origRender;
    });
  });
});

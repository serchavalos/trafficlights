/* global describe, it */
const assert = require('assert');
const TrafficLight = require('../src/TrafficLight.js');
const TrafficLightRenderer = require('../src/TrafficLightRenderer.js');

describe('#TrafficLightRenderer', () => {
  let renderer = new TrafficLightRenderer();

  describe('#render', () => {
    it('should thrown an exception with the wrong arguments', () => {
      let wasExceptionThrown = false;

      try {
        renderer.render({}, '19', null);
      } catch (ex) {
        wasExceptionThrown = true;
      }

      assert.ok(wasExceptionThrown);
    });

    it('should thrown an exception if no context was set', () => {
      let wasExceptionThrown = false;

      try {
        renderer.render(new TrafficLight(), 100, 100);
      } catch (ex) {
        wasExceptionThrown = true;
      }

      assert.ok(wasExceptionThrown);
    });

    it('should execute "render" if context was set', () => {
      let mockContext = {
        fillStyle: '',
        lineWidth: '',
        strokeStyle: '',
        beginPath: () => {},
        moveTo: () => {},
        arc: () => {},
        stroke: () => {},
        fill: () => {},
        closePath: () => {},
        fillText: () => {},
      };

      renderer.setContext(mockContext);
      renderer.render(new TrafficLight(), [100, 100]);
    });
  });
});
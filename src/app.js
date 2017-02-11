/**
 * TODO:
 *  - Start adding unit test. That will give you feedback on how your app looks like
 *  So far our strategy:
 *  - Create a renderer class that will draw the traffic lights
 *  - Intersection will receive the size of the canvas and the lights. It will then take care of the positions
 */

window.onload = function() {
  const north = new TrafficLight();
  const west = new TrafficLight();
  const south = new TrafficLight();
  const east = new TrafficLight();

  // Set links
  north.setNextLight(west);
  west.setNextLight(south);
  south.setNextLight(east);
  east.setNextLight(north);

  const canvas = document.getElementById('canvas');
  const intersection = new Intersection(canvas, [north, west, south, east]);

  // Start sequence
  north.setOnGreen();
  south.setOnGreen();

  (function draw() {
    intersection.render()

    window.requestAnimationFrame(draw);
  })();
};

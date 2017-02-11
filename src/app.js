/* global TrafficLight Intersection */
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
    intersection.render();

    window.requestAnimationFrame(draw);
  })();
};

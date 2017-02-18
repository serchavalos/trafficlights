/* global TrafficLight TrafficLightRenderer IntersectionRenderer */
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
  const trafficLightRenderer = new TrafficLightRenderer();
  const intersection = new IntersectionRenderer(canvas, [north, west, south, east], trafficLightRenderer);

  // Start sequence
  north.startSequence();
  south.startSequence();

  (function draw() {
    intersection.render();

    window.requestAnimationFrame(draw);
  })();
};

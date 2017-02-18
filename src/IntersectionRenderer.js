const TrafficLight = require('./TrafficLight.js');
const TrafficLightRenderer = require('./TrafficLightRenderer.js');

/**
 * @class IntersectionRenderer
 */
class IntersectionRenderer {

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {array<TrafficLight>} givenLights
   * * @param {TrafficLightRenderer} renderer
   */
  constructor(canvas, givenLights, renderer) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lights = [];

    if (givenLights.length !== 4) {
      throw new Error('Invalid argument: requires exaclty 4 traffic lights');
    }

    givenLights.forEach((light) => {
      if (!(light instanceof TrafficLight)) {
        throw new Error('Invalid argument: only Traffic lights are accepted');
      }
      this.lights.push(light);
    });

    if (!(renderer instanceof TrafficLightRenderer)) {
      throw new Error('Invalid argument: it requires an instance of TrafficLightRenderer');
    }

    this.renderer = renderer.setContext(this.ctx);
    this.positions = [];
    this._initPositions();
  }

  /**
   * Render the traffic lights
   */
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.lights.forEach((light, index) => {
      this.renderer.setVertical(index % 2 == 0); // Every other light will be in vertical
      this.renderer.setInverted(index > 1);
      this.renderer.render(light, this.positions[index]);
    });
  }

  /**
   * Initialize the positions of the traffic lights in the intersection
   * TODO: These coordinates are hard-coded. They should be calculated
   * @private
   */
  _initPositions() {
    const height = this.canvas.height;
    const width = this.canvas.width;

    this.positions = [
      // [coordX, coordY]
      [(width/2) - 30, 120], // north
      [width - 110, (height/2) - 43],  // east
      [(width/2) + 50, height - 130], // south
      [120, (height/2) + 33] // west
    ];
  }
}

module.exports = IntersectionRenderer;
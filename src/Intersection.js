class Intersection {
  constructor(canvas, givenLights) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lights = [];

    givenLights.forEach((light) => {
      if (!(light instanceof TrafficLight)) {
        throw new Error('Invalid argument');
      }
      this.lights.push(light);
    });

    this.positions = [];
    this._initPositions();
  };

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.lights.forEach((light, index) => {
      light.render(...this.positions[index], this.ctx);
    });
  };

  _initPositions() {
    const height = this.canvas.height;
    const width = this.canvas.width;

    this.positions = [
      // [coordX, coordY]
      [(width/2), 15],
      [width - 15, (height/2) - 35],
      [(width/2), height - 70],
      [15, (height/2) - 35]
    ];
  }
};

module.exports = Intersection;
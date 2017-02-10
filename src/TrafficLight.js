class TrafficLight {
  constructor() {
    this.currentColor = TrafficLight.COLORS.RED;
    this.nextLight = this;
  }

  setNextLight(trafficLight) {
    if (!(trafficLight instanceof TrafficLight)) {
      throw new Error('Invalid argument');
    }
    this.nextLight = trafficLight;
  }

  setOnGreen() {
    this.currentColor = TrafficLight.COLORS.GREEN;
    setTimeout(() => {
      this.setOnYellow();
    }, 8000);
  }

  setOnYellow() {
    this.currentColor = TrafficLight.COLORS.YELLOW;
    setTimeout(() => {
      this.setOnRed();
    }, 3000);
  }

  setOnRed() {
    this.currentColor = TrafficLight.COLORS.RED;
    this._setNextTrafficLightOnGreen();
  }

  render(coordX, coordY, canvas) {
      canvas.beginPath();
      canvas.arc(coordX, coordY, 10, 0,  2 * Math.PI, true);
      canvas.fillStyle = this.currentColor;
      canvas.fill();
  }

  _setNextTrafficLightOnGreen() {
    this.nextLight.setOnGreen();
  }
}

TrafficLight.COLORS = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
}

module.exports = trafficeLight;
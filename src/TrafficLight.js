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

  render(coordX, coordY, context) {
      context.lineWidth = 2;
      context.strokeStyle = '#333';

      context.beginPath();
      context.arc(coordX, coordY, 10, 0,  2 * Math.PI, true);
      context.stroke();
      context.fillStyle = this.currentColor == TrafficLight.COLORS.GREEN ? TrafficLight.COLORS.GREEN : TrafficLight.COLORS.GRAY;
      context.fill();

      context.beginPath();
      context.moveTo(coordX, coordY + 25);
      context.arc(coordX, coordY + 25, 10, 0,  2 * Math.PI, true);
      context.stroke();
      context.fillStyle = this.currentColor == TrafficLight.COLORS.YELLOW ? TrafficLight.COLORS.YELLOW : TrafficLight.COLORS.GRAY;
      context.fill();

      context.beginPath();
      context.moveTo(coordX, coordY + 50);
      context.arc(coordX, coordY + 50, 10, 0,  2 * Math.PI, true);
      context.stroke();
      context.fillStyle = this.currentColor == TrafficLight.COLORS.RED ? TrafficLight.COLORS.RED : TrafficLight.COLORS.GRAY;
      context.fill();

      context.closePath();
  }

  _setNextTrafficLightOnGreen() {
    this.nextLight.setOnGreen();
  }
}

TrafficLight.COLORS = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
  GRAY: '#aaaaaa',
}

module.exports = TrafficLight;
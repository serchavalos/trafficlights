const TrafficLight = require('./TrafficLight.js');

class TrafficLightRenderer {

  /**
   * @param {CanvasRenderingContext2D} context
   * @return {TrafficLightRenderer}
   */
  setContext(context){
    this.context = context;

    return this;
  }

  /**
   * @param {TrafficLight} trafficLight
   * @param {integer} coordX
   * @param {integer} coordY
   */
  render(light, coordX, coordY) {
    if (
        !(light instanceof TrafficLight) ||
        !(typeof coordX === 'number') ||
        !(typeof coordY === 'number')
        ) {
      throw new Error('Invalid arguments: it requires an instance of TrafficLight');
    }
    let color = light.getColor();

    this.context.lineWidth = 2;
    this.context.strokeStyle = '#333';

    this.context.beginPath();
    this.context.arc(coordX, coordY, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = color == TrafficLight.COLORS.GREEN ? TrafficLight.COLORS.GREEN : TrafficLight.COLORS.GRAY;
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(coordX, coordY + 25);
    this.context.arc(coordX, coordY + 25, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = color == TrafficLight.COLORS.YELLOW ? TrafficLight.COLORS.YELLOW : TrafficLight.COLORS.GRAY;
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(coordX, coordY + 50);
    this.context.arc(coordX, coordY + 50, 10, 0,  2 * Math.PI);
    this.context.stroke();
    this.context.fillStyle = color == TrafficLight.COLORS.RED ? TrafficLight.COLORS.RED : TrafficLight.COLORS.GRAY;
    this.context.fill();

    this.context.closePath();
  }
}

module.exports = TrafficLightRenderer;
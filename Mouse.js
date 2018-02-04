const GameObject = require('./GameObject')

module.exports = class Mouse extends GameObject {
  render() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'grey'
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI)
    ctx.fillStyle = 'grey'
    ctx.fill()
    ctx.moveTo(this.x, this.y);
    ctx.lineWidth = 3
    ctx.lineTo(this.x + 30, this.y + 30);
  }
  update() {

  }
}
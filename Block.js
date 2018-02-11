const GameObject = require('./GameObject')

module.exports = class Block extends GameObject {
  constructor(props) {
    super(props)
    this.width = props.width
    this.height = props.height
  }
  render() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'

    const upperLeftCorner = Vector2(
      this.location.x - (this.width / 2),
      this.location.y - (this.height / 2)
    )

    const upperRightCorner = Vector2(
      this.location.x + (this.width / 2),
      this.location.y - (this.height / 2)
    )


    ctx.moveTo(upperLeftCorner.x, upperLeftCorner.y)
    ctx.lineTo(upperRightCorner.x, upperRightCorner.y)

    ctx.lineTo(this.location.x + (this.width / 2), this.location.y + (this.height / 2))

    ctx.lineTo(this.location.x - (this.width / 2), this.location.y + (this.height / 2))
    ctx.lineTo(this.location.x - (this.width / 2), this.location.y - (this.height / 2))
    ctx.fill()
    
  }
}
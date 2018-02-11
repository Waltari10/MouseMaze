const PF = require('pathfinding')
const { MAP_SCALE } = require('./constants')

const GameObject = require('./GameObject')
const Physics = require('./Physics')

function Vector({ start = Vector2(0,0), hypotenuse = 1, angle = 0 }) {
  const endY = Math.sin(Physics.degreeToRad(angle)) * hypotenuse
  const endX = Math.cos(Physics.degreeToRad(angle)) * hypotenuse

  const newVector = start.clone().add(Vector2(endX, endY))
  return newVector
}

var finder = new PF.AStarFinder({
  allowDiagonal: true,
})

module.exports = class Mouse extends GameObject {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.destination = null
    this.speed = 5
    canvas.addEventListener("click", this.onClick, false)
    this.grid = null
    this.path = null
  }
  onClick (e) {
    const x = e.clientX
    const y = e.clientY

   
    this.grid = new PF.Grid(mapMatrix.length, mapMatrix[0].length)

    const startX = Math.floor(this.location.x / MAP_SCALE)
    const startY = Math.floor(this.location.y / MAP_SCALE)
    const endX = Math.floor(x / MAP_SCALE)
    const endY = Math.floor(y / MAP_SCALE)

    this.path = finder.findPath(
      startX,                  
      startY,                   
      endX,                    
      endY,                  
      this.grid          
    )

    this.destination = Vector2(this.path[0][0] * MAP_SCALE, this.path[0][1] * MAP_SCALE)
  }
  render() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'grey'
    ctx.arc(this.location.x, this.location.y, 15, 0, 2 * Math.PI)
    ctx.fillStyle = 'grey'
    ctx.fill()
    ctx.moveTo(this.location.x, this.location.y);
    ctx.lineWidth = 3

    this.rotation

    const hypotenuse = 50
    const angle = this.rotation + 90 // Why do I need to add 90?

    const tailEndY = Math.sin(Physics.degreeToRad(this.rotation)) * hypotenuse
    const tailEndX = Math.cos(Physics.degreeToRad(this.rotation)) * hypotenuse

    ctx.lineTo(this.location.x - tailEndX, this.location.y - tailEndY)
  }
  update() {

    if (this.destination && this.location !== this.destination) {
      // Moving towards destination
      const differenceVec = this.destination.clone().subtract(this.location)
      if (differenceVec.length() <= this.speed) {
        this.location = this.destination
      } else {
        this.rotation = differenceVec.angleDeg()
        this.location = Vector({ start: this.location, hypotenuse: this.speed, angle: this.rotation })
      }
    } else if (this.destination && this.path && this.path.length > 0) {
      // destination reached
      const destinationArr = this.path.shift()
      this.destination = Vector2(destinationArr[0] * MAP_SCALE, destinationArr[1] * MAP_SCALE)
    }
  }
}
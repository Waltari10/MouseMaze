const Mouse = require('./Mouse')
const Block = require('./Block')

function createScene () {
  instantiate(Mouse, {
    location: Vector2(100, 100)
  })

  instantiate(Block, {
    location: Vector2(150, 150),
    width: 20,
    height: 100,
    obstacle: true
  })

  instantiate(Block, {
    location: Vector2(50, 300),
    width: 100,
    height: 100,
    obstacle: true
  })

  instantiate(Block, {
    location: Vector2(500, 250),
    width: 10,
    height: 100,
    obstacle: true
  })

  instantiate(Block, {
    location: Vector2(300, 250),
    width: 10,
    height: 100,
    obstacle: true
  })

  instantiate(Block, {
    location: Vector2(300, 5),
    width: 1000,
    height: 10,
    obstacle: true
  })

  instantiate(Block, {
    location: Vector2(300, 300),
    width: 200,
    height: 10,
    obstacle: true
  })
}

module.exports = {
  createScene
}
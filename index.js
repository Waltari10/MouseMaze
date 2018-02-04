const _ = require('lodash')
const GameObject = require('./GameObject')
const Mouse = require('./Mouse')
const uniqid = require('uniqid')


const targetFPS = 60
const targetFrameDuration = (1000 / targetFPS)

global.canvas = document.getElementById('canvas')
global.ctx = canvas.getContext('2d')
global.timeDelta = 1000 / targetFPS
global.gameObjects = {}
global.instantiate = function (classTemplate, args) {
  const id = uniqid()
  const instance = new classTemplate(Object.assign({
    id
  }, args))
  gameObjects[id] = instance
  return instance
}
global.destroy = function (instance) {
  delete gameObjects[instance.id]
}

canvas.addEventListener("click", function (e) {
  const x = e.clientX
  const y = e.clientY
  console.log(x, y)
  // if (Math.pow(x - 50, 2) + Math.pow(y - 50, 2) < Math.pow(50, 2))
  //   bigGreen.clicked()
}, false)    

instantiate(Mouse, {
  x: 100,
  y: 100,
})

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const key in gameObjects) {
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(gameObjects[key].x, gameObjects[key].y)
    gameObjects[key].render()
    ctx.stroke()
  }
}

function loop() {
  const startTime = Date.now()
  updateGravity()
  updateGameObjects()
  draw()
  const renderTime = Date.now() - startTime
  timeDelta = renderTime < targetFrameDuration ? targetFrameDuration : renderTime
  this.setTimeout(() => {
    loop()
  }, targetFrameDuration - renderTime)
}

function updateGameObjects() {
  for (const key in gameObjects) {
    gameObjects[key].update()
  }
}

function updateGravity() {
  for (const key in gameObjects) {
    if (gameObjects[key].isGravity) {
      gameObjects[key].updateGravity()
    }
  }
}

loop()
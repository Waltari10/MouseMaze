const { targetFPS, targetFrameDuration } = require('./constants')

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

function updateGameObjects() {
  for (const key in gameObjects){
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

function loop() {
  const startTime = Date.now()
  updateGravity()
  updateGameObjects()
  draw()
  const renderTime = Date.now() - startTime
  timeDelta = renderTime < targetFrameDuration ? targetFrameDuration : renderTime
  // console.log(timeDelta)
  this.setTimeout(() => {
    loop()
  }, targetFrameDuration - renderTime)
}

module.exports = { loop }
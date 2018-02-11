const _ = require('lodash')
const GameObject = require('./GameObject')
const uniqid = require('uniqid')
const Victor = require('victor')
const PF = require('pathfinding')
const { loop } = require('./loop')
const { TARGET_FPS, MAP_SCALE } = require('./constants')
const { createScene } = require('./MouseMazeScene')

let obstacles = []


global.Vector2 = function(x, y) { return new Victor(x, y)}
global.canvas = document.getElementById('canvas')
global.ctx = canvas.getContext('2d')
global.timeDelta = 1000 / TARGET_FPS
global.gameObjects = {}
global.instantiate = function (classTemplate, args) {
  const id = uniqid()
  const instance = new classTemplate(Object.assign({ id }, args))
  gameObjects[id] = instance
  if (args.obstacle) {
    obstacles.push(instance)
    createMap()
  }
  return instance
}
global.destroy = function (instance) {
  delete gameObjects[instance.id]
} 

function createMap() {
  const mapWidth = Math.floor(canvas.width / 10)
  const mapHeight = Math.floor(canvas.height / 10)
  const mapMatrix = Array(mapWidth).fill(Array(mapHeight))
  global.PFGrid = new PF.Grid(mapMatrix.length, mapMatrix[0].length)
  
  const bumper = 1


  obstacles.forEach(obstacle => {

    const blockLeftX = Math.ceil((obstacle.location.x - (obstacle.width / 2)) / MAP_SCALE) - bumper
    const blockRightX = Math.ceil((obstacle.location.x + (obstacle.width / 2)) / MAP_SCALE) + bumper

    const blockBottomY = Math.ceil((obstacle.location.y - (obstacle.height / 2)) / MAP_SCALE) - bumper
    const blockTopY = Math.ceil((obstacle.location.y + (obstacle.height / 2)) / MAP_SCALE) + bumper

    for (let x = blockLeftX; x < blockRightX; x++) {
      for (let y = blockBottomY; y < blockTopY; y++) {
       
         try {
          global.PFGrid.setWalkableAt(
            x,
            y,
            false
          )
         } catch(err) {
           console.log(err)
           // Block outside of canvas
         }
      }
    }
  })
}

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  createMap()
}

window.addEventListener('resize', resizeCanvas, false)
resizeCanvas()
createScene()
loop()

// grid.setWalkableAt(0, 1, false);
// var mapMatrix = [
//   [0, 0, 0, 1, 0],
//   [1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 0],
// ];

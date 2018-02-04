const _ = require('lodash')
const GameObject = require('./GameObject')
const uniqid = require('uniqid')
const Victor = require('victor');
var PF = require('pathfinding');
const { loop } = require('./loop')
const { targetFPS } = require('./constants')
const { createScene } = require('./MouseMazeScene')

var matrix = [
  [0, 0, 0, 1, 0],
  [1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0],
];

var grid = new PF.Grid(matrix);

global.Vector2 = function(x, y) {
  return new Victor(x, y)
}
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

createScene()

loop()

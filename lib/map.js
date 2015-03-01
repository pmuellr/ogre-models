// Licensed under the Apache License. See footer for details.

var _ = require("underscore")

var utils = require("./utils")

//------------------------------------------------------------------------------
exports.createMap = createMap

//------------------------------------------------------------------------------
function createMap(props) {
  return new Map(props)
}

//------------------------------------------------------------------------------
function Map(props) {
  this.width   = props.width
  this.height  = props.height
  this.craters = []
  this.rubbles = []

  var craters = (props.craters || []).slice()
  var rubbles = (props.rubbles || []).slice()

  var map = this

  craters.forEach(function(crater){
    if (!map.isValidXY(crater[0], crater[1])) return

    map.craters.push(crater)
  })

  rubbles.forEach(function(rubble){
    if (!map.isValidXY(rubble[0], rubble[1])) return
    if (!map.isValidXY(rubble[2], rubble[3])) return

    map.rubbles.push(rubble)
  })

  this.nabors = buildNabors(this)
}

Map.prototype.isValidXY = Map_isValidXY
Map.prototype.isCrater  = Map_isCrater
Map.prototype.isRubble  = Map_isRubble
Map.prototype.getNabors = Map_getNabors
Map.prototype.distance  = Map_distance

//------------------------------------------------------------------------------
function Map_isValidXY(x, y) {
  if (x <= 0)         return false
  if (x > this.width) return false

  if (y <= 0)          return false
  if (y > this.height) return false

  if ((x%2 == 1) && (y == 1)) return false

  return true
}

//------------------------------------------------------------------------------
function Map_isCrater(x, y) {
  if (!this.isValidXY(x, y)) return false

  for (var i=0; i<this.craters.length; i++) {
    var crater = this.craters[i]
    if ((crater[0] == x) && (crater[1] == y)) return true
  }

  return false
}

//------------------------------------------------------------------------------
function Map_isRubble(x1, y1, x2, y2) {
  if (!this.isValidXY(x1, y1)) return false
  if (!this.isValidXY(x2, y2)) return false

  for (var i=0; i<this.rubbles.length; i++) {
    var rubble = this.rubbles[i]

    if ((rubble[0] == x1) && (rubble[1] == y1)) {
      if ((rubble[2] == x2) && (rubble[3] == y2)) {
        return true
      }
    }

    if ((rubble[0] == x2) && (rubble[1] == y2)) {
      if ((rubble[2] == x1) && (rubble[3] == y1)) {
        return true
      }
    }
  }

  return false
}

//------------------------------------------------------------------------------
function Map_getNabors(x, y) {
  if (!this.isValidXY(x, y)) return []

  return this.nabors[x][y] || []
}


//------------------------------------------------------------------------------
function Map_distance(x1, y1, x2, y2) {
  if (!this.isValidXY(x1, y1)) return null
  if (!this.isValidXY(x2, y2)) return null

  return distance(this, x1, y1, x2, y2)
}

//------------------------------------------------------------------------------
/*
     2,1   ...  14,1
1,2        ...        15,2
     2,2   ...  14,2
1,3        ...        15,3
     2,3   ...  14,3
.... ....  ...  ....  ....
     2,21  ...  14,21
1,22       ...        15,22
     2,22  ...  14,22
*/

//------------------------------------------------------------------------------
function distance(map, x1, y1, x2, y2) {
  // console.log("distance(" + x1 + "," + y1 + "," + x2 + "," + y2 + "):")
  if ((x1 == x2) && (y1 == y2)) return 0

  if (x1 == x2) return Math.abs(y2 - y1)

  var nabors = map.getNabors(x1, y1)
  // console.log("nabors(" + x1 + "," + y1 + "):" + utils.JL(nabors))

  var bestDistance = 1000 * 1000 * 1000
  var bestXY       = null

  for (var i=0; i<nabors.length; i++) {
    var xn = nabors[i].loc[0]
    var yn = nabors[i].loc[1]

    if ((xn == x2) && (yn == y2)) return 1

    var rDistance = realDistance(xn, yn, x2, y2)
    if (rDistance < bestDistance) {
      // console.log("best distance: " + rDistance)
      bestDistance = rDistance
      bestXY       = [xn, yn]
    }
  }

  return 1 + distance(map, bestXY[0], bestXY[1], x2, y2)
}

//------------------------------------------------------------------------------
function realDistance(x1, y1, x2, y2) {
  if (!x1%2) y1 += 0.5
  if (!x2%2) y2 += 0.5

  var d = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
  // console.log("real distance: " + x1 + "," + y1 + " - " + x2 + "," + y2 + " = " + d)
  return d
}

//------------------------------------------------------------------------------
function buildNabors(map) {
  var nabors = []
  var yEvens = [0,  1]
  var yOdds  = [-1, 0]
  var ySame  = [-1, 1]
  var yOffsets

  for (var x=1; x<=map.width; x++) {
    nabors[x] = []

    for (var y=1; y<=map.height; y++) {
      if (!map.isValidXY(x, y)) continue
      nabors[x][y] = []

      for (var i=-1; i<=1; i++) {
        if (i === 0) {
          yOffsets = ySame
        }
        else if (x%2) {
          yOffsets = yOdds
        }
        else {
          yOffsets = yEvens
        }

        for (var j=0; j<2; j++) {
          var xt = x + i
          var yt = y + yOffsets[j]

          if (!map.isValidXY(xt,yt)) continue

          var nabor = { loc: [xt, yt] }

          if (map.isRubble(x, y, xt, yt)) nabor.rubble = true
          if (map.isCrater(xt, yt))       nabor.crater = true

          nabors[x][y].push(nabor)
        }
      }

    }
  }

  return nabors
}

//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

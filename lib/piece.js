// Licensed under the Apache License. See footer for details.

var _ = require("underscore")

var utils = require("./utils")

//------------------------------------------------------------------------------
exports.createPiece = createPiece

//------------------------------------------------------------------------------
function createPiece(props) {
  return new Piece(props)
}

//------------------------------------------------------------------------------
function Piece(props) {
  this.x         = null
  this.y         = null
  this.disabled  = false
  this.movement  = props.movement || 0
  this.weapons   = []
  this.treadsMax = props.treads   || 0
  this.treads    = this.treadsMax

  var weapons = props.weapons || []
  weapons.forEach(function(weapon){
    this.weapons.push(weapon.clone())
  })
}

Piece.prototype.clone = Piece_clone

//------------------------------------------------------------------------------
function Piece_clone() {
  return new Piece(this)
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

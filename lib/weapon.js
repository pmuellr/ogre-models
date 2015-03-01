// Licensed under the Apache License. See footer for details.

var _ = require("underscore")

var utils = require("./utils")

//------------------------------------------------------------------------------
exports.createWeapon = createWeapon

//------------------------------------------------------------------------------
function createWeapon(props) {
  return new Weapon(props)
}

//------------------------------------------------------------------------------
function Weapon(props) {
  this.attack   = props.attack   || 0
  this.defense  = props.defense  || 0
  this.distance = props.distance || 0

  if (props.oneTime) this.oneTime = true
}

Weapon.prototype.clone = Weapon_clone

//------------------------------------------------------------------------------
function Weapon_clone() {
  return new Weapon(this)
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

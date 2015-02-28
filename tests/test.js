// Licensed under the Apache License. See footer for details.

var path = require("path")

var tape   = require("tape")
var faucet = require("faucet")

var pkg = require("../package.json")

var PACKAGE = pkg.name

//------------------------------------------------------------------------------
var formatter = faucet()

tape.createStream()
  .pipe(formatter)
  .pipe(process.stdout)

//------------------------------------------------------------------------------
runTests("test-package")
runTests("test-map")

//------------------------------------------------------------------------------
function runTests(modName) {
  tape("running tests: " + PACKAGE + "/" + modName, function (t) {
    require("./" + modName)(t)
    t.end()
  })
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

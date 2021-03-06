// Licensed under the Apache License. See footer for details.

var _ = require("underscore")

var utils = require("../lib/utils")

var ogreModels = require("..")

//------------------------------------------------------------------------------
module.exports = tester

//------------------------------------------------------------------------------
function tester(t) {

  var mapSpec = {
    width:   15,
    height:  22,
    craters: [ [3,4] ],
    rubbles: [ [1,3, 2,3]]
  }

  var map = ogreModels.createMap(mapSpec)

  //-----------------------------------
  t.test("- isValidXY", function(t) {
    ok(1,2)
    ok(2,1)
    ok(14,1)
    ok(15,2)
    ok(1,22)
    ok(2,22)
    ok(14,22)
    ok(15,22)

    notok(0,0)
    notok(1,1)
    notok(15,1)
    notok(1,23)
    notok(15,23)

    t.end()

    //---------------------------------
    function ok(x,y) {
      t.ok(map.isValidXY(x,y), "" + x + "," + y + " should be a valid XY")
    }

    //---------------------------------
    function notok(x,y) {
      t.notok(map.isValidXY(x,y), "" + x + "," + y + " should not be a valid XY")
    }

  })

  //-----------------------------------
  t.test("- isCrater", function(t) {
    t.ok(    map.isCrater(3,4), "3,4 should be a crater")
    t.notok( map.isCrater(3,3), "3,3 should not be a crater")
    t.notok( map.isCrater(0,0), "0,0 should not be a crater")
    t.end()
  })

  //-----------------------------------
  t.test("- isRubble", function(t) {
    t.ok(    map.isRubble(1,3, 2,3), "1,3, 2,3 should be rubble")
    t.ok(    map.isRubble(2,3, 1,3), "2,3, 1,3 should be rubble")
    t.notok( map.isRubble(1,3, 2,2), "1,3, 2,2 should not be rubble")
    t.notok( map.isRubble(1,1, 2,2), "1,1, 2,2 should not be rubble")
    t.notok( map.isRubble(0,0, 2,2), "0,0, 2,2 should not be rubble")
    t.end()
  })

  //-----------------------------------
  t.test("- getNabors", function(t) {
    var nabors
    var expected

    nabors = map.getNabors(1,1)
    t.deepLooseEqual(nabors, [], "1,1 should have no nabors")

    nabors   = map.getNabors(1,2)
    expected = [
      { loc: [1, 3] },
      { loc: [2, 1] },
      { loc: [2, 2] }
    ]
    t.deepLooseEqual(nabors, expected, "1,2 nabors not correct")

    nabors   = map.getNabors(2,3)
    expected = [
      { loc: [1, 3], rubble: true },
      { loc: [1, 4] },
      { loc: [2, 2] },
      { loc: [2, 4] },
      { loc: [3, 3] },
      { loc: [3, 4], crater: true },
    ]
    t.deepLooseEqual(nabors, expected, "2,3 nabors not correct")

    nabors   = map.getNabors(1,22)
    expected = [
      { loc: [1, 21] },
      { loc: [2, 21] },
      { loc: [2, 22] }
    ]
    t.deepLooseEqual(nabors, expected, "1,22 nabors not correct")

    nabors   = map.getNabors(15,2)
    expected = [
      { loc: [14, 1] },
      { loc: [14, 2] },
      { loc: [15, 3] }
    ]
    t.deepLooseEqual(nabors, expected, "15,2 nabors not correct")

    nabors   = map.getNabors(15,22)
    expected = [
      { loc: [14, 21] },
      { loc: [14, 22] },
      { loc: [15, 21] }
    ]
    t.deepLooseEqual(nabors, expected, "15,22 nabors not correct")

    t.end()
  })

  //-----------------------------------
  t.test("- distance", function(t) {
    equal(t, 1,2, 1,2, 0)
    equal(t, 1,2, 1,3, 1)
    equal(t, 1,2, 1,4, 2)
    equal(t, 1,2, 1,5, 3)

    equal(t, 1,2, 2,1, 1)
    equal(t, 1,2, 3,2, 2)
    equal(t, 1,2, 4,1, 3)

    equal(t, 1,2, 3,3, 2)
    equal(t, 1,2, 3,4, 3)
    equal(t, 1,2, 3,4, 3)

    t.end()

    //---------------------------------
    function equal(t, x1, y1, x2, y2, ed) {
      var ad
      var message

      ad = map.distance(x1,y1, x2,y2)
      message = "distance from " +
        x1 + "," + y1 + " to " +
        x2 + "," + y2 +
        " should be " + ed + " not " + ad

      t.equal(ad, ed, message)

      ad = map.distance(x2,y2, x1,y1)
      message = "distance from " +
        x2 + "," + y2 + " to " +
        x1 + "," + y1 +
        " should be " + ed + " not " + ad

      t.equal(ad, ed, message)
    }

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

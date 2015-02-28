# Licensed under the Apache License. See footer for details.

require "cakex"

child_process = require "child_process"

pkg = require "./package.json"

preReqFile = "../ragents-test/tmp/pre-reqs-updated.txt"

#-------------------------------------------------------------------------------
task "watch", "watch for source file changes, build", -> taskWatch()
task "build", "run a build",                          -> taskBuild()
task "test",  "run tests",                            -> taskTest()

WatchSpec = "lib/**/* tests/**/*"

#-------------------------------------------------------------------------------
mkdir "-p", "tmp"

#-------------------------------------------------------------------------------
taskBuild = ->
  log "running build ..."

  log "running jshint ..."
  jshint "lib/*.js tests/*.js"

#-------------------------------------------------------------------------------
taskTest = ->
  log "running tests ..."

  cmd  = "node"
  args = [ "tests/test" ]
  opts = { stdio: "inherit" }

  child_process.spawnSync(cmd, args, opts)

#-------------------------------------------------------------------------------
taskWatch = ->
  watchIter()

  watch
    files: WatchSpec.split " "
    run:   watchIter

  watch
    files: "Cakefile"
    run: (file) ->
      return unless file == "Cakefile"
      log "Cakefile changed, exiting"
      exit 0

#-------------------------------------------------------------------------------
watchIter = ->
  log "in #{path.relative "../..", __dirname}"

  taskBuild()
  taskTest()

#-------------------------------------------------------------------------------
cleanDir = (dir) ->
  mkdir "-p", dir
  rm "-rf", "#{dir}/*"

#-------------------------------------------------------------------------------
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------

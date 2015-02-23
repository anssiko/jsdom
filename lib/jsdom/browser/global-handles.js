/* jshint strict: false */
// no use strict!

// global-handles is used to collect and store all global handles of windows
// it can then be used to translate those global handles back into Windows
// this is needed to implement implicit-this which is the case in EventTargets for example

var vm = require("vm");
var handles = new WeakMap();

function someFunc() {
  return this;
}

function addHandle(window) {
  window.someFunc = someFunc;
  handles.set(vm.runInContext("someFunc()", window), window);
  delete window.someFunc;
}

function getWindow(handle) {
  return handles.get(handle);
}

module.exports = {
  addHandle: addHandle,
  getWindow: getWindow
};
'use strict';

var fs = require('fs');


function readFile(filename) {
  return fs.readFileSync(filename, { encoding: 'UTF-8' });
}

module.exports.readFile = readFile;


var BpmnModdle = require('bpmn-moddle');

var camundaDescriptor = require('../resources/camunda');

function createModdle() {
  return new BpmnModdle({
    camunda: camundaDescriptor
  });
}

module.exports.createModdle = createModdle;

function assign() {
  if (arguments.length === 0) return;
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function assignNext(result, obj) {
    if (result === undefined) return obj;
    if (!obj) return result;
    Object.keys(obj).forEach(function setKey(key) {
      result[key] = obj[key];
    });
    return result;
  });
}

module.exports.assign = assign;

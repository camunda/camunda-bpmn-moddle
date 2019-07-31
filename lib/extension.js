'use strict';

var isFunction = require('min-dash').isFunction,
    isObject = require('min-dash').isObject,
    some = require('min-dash').some;

var WILDCARD = '*';


function CamundaModdleExtension(eventBus) {
  eventBus.on('moddleCopy.canCopyProperty', function(context) {
    var property = context.property,
        parent = context.parent;

    return this.canCopyProperty(property, parent);
  }, this);
}

CamundaModdleExtension.$inject = [ 'eventBus' ];

/**
 * Check wether to disallow copying property.
 */
CamundaModdleExtension.prototype.canCopyProperty = function(property, parent) {

  // (1) check wether property is allowed in parent
  if (isObject(property) && !isAllowedInParent(property, parent)) {

    return false;
  }

  // (2) check more complex scenarios

  // connector and field
  if (isAny(property, [ 'camunda:Connector', 'camunda:Field' ])) {

    // check wether parent is message event definition and is child of intermediate throwing event
    // or end event
    if (getParent(parent, 'bpmn:MessageEventDefinition') &&
      !getParent(parent, 'bpmn:IntermediateThrowEvent') &&
      !getParent(parent, 'bpmn:EndEvent')) {
      return false;
    }

  }

  // retry cycle
  if (is(property, 'camunda:FailedJobRetryTimeCycle')) {

    // check wether parent is event that does NOT have signal or timer event definition
    if (getParent(parent, 'bpmn:Event') && !canCopyRetryCycle(parent)) {
      return false;
    }

  }
};

module.exports = CamundaModdleExtension;

// helpers //////////

function is(element, type) {
  return element && isFunction(element.$instanceOf) && element.$instanceOf(type);
}

function isAny(element, types) {
  return some(types, function(t) {
    return is(element, t);
  });
}

function getParent(element, type) {
  if (!type) {
    return element.$parent;
  }

  if (is(element, type)) {
    return element;
  }

  if (!element.$parent) {
    return;
  }

  return getParent(element.$parent, type);
}

function isAllowedInParent(property, parent) {

  // (1) find property descriptor
  var descriptor = property.$type && property.$model.getTypeDescriptor(property.$type);

  var allowedIn = descriptor && descriptor.meta && descriptor.meta.allowedIn;

  if (!allowedIn || isWildcard(allowedIn)) {
    return true;
  }

  // (2) check wether property has parent of allowed type
  return some(allowedIn, function(type) {
    return getParent(parent, type);
  });
}

function isWildcard(allowedIn) {
  return allowedIn.indexOf(WILDCARD) !== -1;
}

function canCopyRetryCycle(parent) {
  var eventDefinition =
    getParent(parent, 'bpmn:SignalEventDefinition') ||
    getParent(parent, 'bpmn:TimerEventDefinition');

  if (!eventDefinition) {
    return false;
  }

  // allow copying if parent signal event is intermediate throwing
  if (is(eventDefinition, 'bpmn:SignalEventDefinition')) {
    return getParent(parent, 'bpmn:IntermediateThrowEvent');
  }

  // allow copying if parent timer event is catching
  if (is(eventDefinition, 'bpmn:TimerEventDefinition')) {
    return getParent(parent, 'bpmn:CatchEvent');
  }

  return false;
}
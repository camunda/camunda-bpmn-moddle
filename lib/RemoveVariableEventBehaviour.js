'use strict';

var inherits = require('inherits');

var CommandInterceptor = require('diagram-js/lib/command/CommandInterceptor').default;
var is = require('bpmn-js/lib/util/ModelUtil').is;
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

/**
 * Remove 'camunda:variableEvents' property when a startEvent is moved out of an event subProcess.
 */
function RemoveVariableEventBehaviour(
    modeling, injector, bpmnFactory, moddleCopy
) {
  injector.invoke(CommandInterceptor, this);

  this.postExecuted(['shape.move', 'shape.create'], function(context) {

    var newParent = context.newParent || context.parent,
        newParentBusinessObject = getBusinessObject(newParent),
        shape = context.shape,
        shapeBusinessObject = getBusinessObject(shape),
        eventDefinitions, definitionsCopy;

    var update = false;

    if (is(shape, 'bpmn:StartEvent')) {

      if (!(is(newParent, 'bpmn:SubProcess') && newParentBusinessObject.get('triggeredByEvent'))) {

        eventDefinitions = shapeBusinessObject.get('eventDefinitions');
        definitionsCopy = eventDefinitions.slice();

        definitionsCopy.forEach(function(eventDefinition, index) {
          if (!is(eventDefinition, 'bpmn:ConditionalEventDefinition')) {
            return;
          }

          if (eventDefinition.get('camunda:variableEvents')) {
            update = true;

            var newDefinition = bpmnFactory.create('bpmn:ConditionalEventDefinition');
            moddleCopy.copyElement(eventDefinition, newDefinition);
            newDefinition.$parent = eventDefinition.$parent;

            // remove variableEvents property
            newDefinition.variableEvents = undefined;
            definitionsCopy[index] = newDefinition;
          }
        });

        if (update) {
          modeling.updateProperties(shape, { 'eventDefinitions': definitionsCopy });
        }
      }
    }
  }, true);
}

RemoveVariableEventBehaviour.$inject = [
  'modeling',
  'injector',
  'bpmnFactory',
  'moddleCopy'
];

inherits(RemoveVariableEventBehaviour, CommandInterceptor);

module.exports = RemoveVariableEventBehaviour;

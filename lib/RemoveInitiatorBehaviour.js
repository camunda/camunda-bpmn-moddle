'use strict';

var inherits = require('inherits');

var CommandInterceptor = require('diagram-js/lib/command/CommandInterceptor').default;
var is = require('bpmn-js/lib/util/ModelUtil').is;

/**
 * Remove 'camunda:initiator' property when a startEvent is moved into a subProcess
 */
function RemoveInitiatorBehaviour(
    modeling, injector
) {

  injector.invoke(CommandInterceptor, this);


  this.postExecuted(['shape.move'], function(context) {

    var shape = context.shape;

    if (is(shape, 'bpmn:StartEvent')) {

      // if moved into subprocess
      if (!is(context.oldParent, 'bpmn:SubProcess') && (is(context.newParent, 'bpmn:SubProcess'))) {

        // remove initiator property
        modeling.updateProperties(shape, { 'camunda:initiator': undefined });

      }
    }

  }, true);
}

RemoveInitiatorBehaviour.$inject = [
  'modeling',
  'injector',
];

inherits(RemoveInitiatorBehaviour, CommandInterceptor);

module.exports = RemoveInitiatorBehaviour;

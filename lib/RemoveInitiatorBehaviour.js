import inherits from 'inherits-browser';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';


/**
 * Remove `camunda:initiator` property when a startEvent is moved to or created within a subProcess.
 */
export default function RemoveInitiatorBehaviour(
    modeling, injector
) {

  injector.invoke(CommandInterceptor, this);

  this.postExecuted(['shape.create','shape.move'], function(context) {

    var shape = context.shape,
        newParent = context.newParent || context.parent,
        businessObject = getBusinessObject(shape);

    // if shape is a startEvent and has an initiator proterty
    if (is(shape, 'bpmn:StartEvent') && businessObject.get('camunda:initiator') !== undefined) {

      // if subProcess becomes the new parent
      if ((is(newParent, 'bpmn:SubProcess'))) {

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

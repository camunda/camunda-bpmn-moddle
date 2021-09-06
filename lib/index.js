'use strict';

module.exports = {
  __init__: [
    'camundaCopyPasteBehavior',
    'camundaCopyPasteRootElementBehavior',
    'camundaRemoveInitiatorBehaviour',
    'camundaRemoveVariableEventBehaviour'
  ],
  camundaCopyPasteBehavior: [ 'type', require('./CopyPasteBehavior') ],
  camundaCopyPasteRootElementBehavior: [ 'type', require('./CopyPasteRootElementBehavior') ],
  camundaRemoveInitiatorBehaviour: ['type', require('./RemoveInitiatorBehaviour') ],
  camundaRemoveVariableEventBehaviour: ['type', require('./RemoveVariableEventBehaviour') ]

};

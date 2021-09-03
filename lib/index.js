'use strict';

module.exports = {
  __init__: [
    'camundaCopyPasteBehavior',
    'camundaCopyPasteRootElementBehavior',
    'camundaRemoveInitiatorBehaviour'
  ],
  camundaCopyPasteBehavior: [ 'type', require('./CopyPasteBehavior') ],
  camundaCopyPasteRootElementBehavior: [ 'type', require('./CopyPasteRootElementBehavior') ],
  camundaRemoveInitiatorBehaviour: ['type', require('./RemoveInitiatorBehaviour')]
};

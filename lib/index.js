import CopyPasteBehavior from './CopyPasteBehavior';
import CopyPasteRootElementBehavior from './CopyPasteRootElementBehavior';
import RemoveInitiatorBehaviour from './RemoveInitiatorBehaviour';
import RemoveVariableEventBehaviour from './RemoveVariableEventBehaviour';

export default {
  __init__: [
    'camundaCopyPasteBehavior',
    'camundaCopyPasteRootElementBehavior',
    'camundaRemoveInitiatorBehaviour',
    'camundaRemoveVariableEventBehaviour'
  ],
  camundaCopyPasteBehavior: [ 'type', CopyPasteBehavior ],
  camundaCopyPasteRootElementBehavior: [ 'type', CopyPasteRootElementBehavior ],
  camundaRemoveInitiatorBehaviour: ['type', RemoveInitiatorBehaviour ],
  camundaRemoveVariableEventBehaviour: ['type', RemoveVariableEventBehaviour ]
};

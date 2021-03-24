'use strict';

module.exports = {
  __init__: [
    'camundaCopyPasteBehavior',
    'camundaCopyPasteRootElementBehavior'
  ],
  camundaCopyPasteBehavior: [ 'type', require('./CopyPasteBehavior') ],
  camundaCopyPasteRootElementBehavior: [ 'type', require('./CopyPasteRootElementBehavior') ]
};

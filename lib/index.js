'use strict';

module.exports = {
  __init__: [ 'camundaModdleExtension', 'rootElementReferenceBehavior' ],
  camundaModdleExtension: [ 'type', require('./extension') ],
  rootElementReferenceBehavior: [ 'type', require('./RootElementReferenceBehavior') ]
};

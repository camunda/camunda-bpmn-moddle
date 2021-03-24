'use strict';

module.exports = {
  __init__: [ 'camundaModdleExtension', 'camundaRootElementReferenceBehavior' ],
  camundaModdleExtension: [ 'type', require('./extension') ],
  camundaRootElementReferenceBehavior: [ 'type', require('./CamundaRootElementReferenceBehavior') ]
};

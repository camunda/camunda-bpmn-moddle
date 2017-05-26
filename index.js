/*
	Import and using it with ES6:
	----------------------------
	import * as BpmnModeler from 'bpmn-js/lib/Modeler';
	import { CamundaModdleExtension, CamundaModdleExtensionJson } from 'camunda-bpmn-moddle';


	Using it:
	---------
	const modeler = new BpmnModeler({
		additionalModules: [
			CamundaModdleExtension
		],
		moddleExtensions: {
			camunda: CamundaModdleExtensionJson
		}
	});

*/

'use strict';

module.exports = {
  __init__: [ 'CamundaModdleExtension' ],
  CamundaModdleExtension: [ 'type', require('./lib/extension') ],
  CamundaModdleExtensionJson: require('./resources/camunda.json')
};

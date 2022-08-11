# camunda-bpmn-moddle

[![CI](https://github.com/camunda/camunda-bpmn-moddle/workflows/CI/badge.svg)](https://github.com/camunda/camunda-bpmn-moddle/actions?query=workflow%3ACI)

This project defines the [Camunda](https://camunda.org) namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.


## Usage

Use it together with [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) to validate Camunda BPMN 2.0 extensions.

```javascript
import BpmnModdle from 'bpmn-moddle';

import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

var moddle = new BpmnModdle({ camunda: camundaModdle });

var serviceTask = moddle.create('bpmn:ServiceTask', {
  'javaDelegate': 'my.company.SomeDelegate'
});
```


## Building the Project

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
npm test
```

Perform a complete build of the application via

```
npm run all
```


## [bpmn-js](https://github.com/bpmn-io/bpmn-js) Extension

We include an extension that makes [bpmn-js](https://github.com/bpmn-io/bpmn-js) Modeler copy and replace mechanisms aware of Camunda properties.

```js
import BpmnModeler from 'bpmn-js/lib/Modeler';

import camundaExtensionModule from 'camunda-bpmn-moddle/lib';
import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

var modeler = new BpmnModeler({
  additionalModules: [
    camundaExtensionModule
  ],
  moddleExtensions: {
    camunda: camundaModdle
  }
});
```

This extension hooks into the copy mechanism provided by the BPMN editor and ensures Camunda properties are kept and or dropped on copy and element replace.


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).

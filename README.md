# camunda-bpmn-moddle

[![Build Status](https://travis-ci.org/camunda/camunda-bpmn-moddle.svg)](https://travis-ci.org/camunda/camunda-bpmn-moddle)

This project defines the [Camunda](https://camunda.org) namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.


## Usage

Use it together with [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) to validate Camunda BPMN 2.0 extensions.

```javascript
var BpmnModdle = require('bpmn-moddle');

var camundaModdle = require('camunda-bpmn-moddle/resources/camunda');

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

We include an extension that makes [bpmn-js](https://github.com/bpmn-io/bpmn-js) copy and replace mechanisms aware of Camunda properties.

```js
var BpmnJS = require('bpmn-js/lib/Modeler'),
    camundaExtensionModule = require('camunda-bpmn-moddle/lib'),
    camundaModdle = require('camunda-bpmn-moddle/resources/camunda');

var modeler = new BpmnJS({
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

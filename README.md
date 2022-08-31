# camunda-bpmn-moddle

[![CI](https://github.com/camunda/camunda-bpmn-moddle/workflows/CI/badge.svg)](https://github.com/camunda/camunda-bpmn-moddle/actions?query=workflow%3ACI)

This project defines the [Camunda](https://camunda.org) namespace extensions for BPMN 2.0 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.


## Usage

Use it together with [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) to validate Camunda BPMN 2.0 extensions.

```javascript
import BpmnModdle from 'bpmn-moddle';

import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

const moddle = new BpmnModdle({ camunda: camundaModdle });

const serviceTask = moddle.create('bpmn:ServiceTask', {
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

## Behaviors

Inside a [bpmn-js editor](https://github.com/bpmn-io/bpmn-js) pair this extension with [camunda-bpmn-js-behaviors](https://github.com/camunda/camunda-bpmn-js-behaviors#camunda-platform-7) to ensure Camunda properties are created, updated and deleted as expected.


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).

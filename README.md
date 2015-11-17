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

You need [grunt](http://gruntjs.com) to build the project.

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
grunt test
```

Perform a complete build of the application via

```
grunt
```


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).

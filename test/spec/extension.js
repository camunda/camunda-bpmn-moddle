'use strict';

var CamundaModdleExtension = require('../../lib/extension');

var createModdle = require('../helper').createModdle;

describe('extension', function() {

  var extension = new CamundaModdleExtension({ on: function() {} }),
      moddle;

  beforeEach(function() {
    moddle = createModdle();
  });

  it('can clone "connector" -> MessageEndEvent', function() {
    // given
    var connector = moddle.create('camunda:Connector', {
      connectorId: 'hello_connector'
    });

    var msgEvtDef = moddle.create('bpmn:MessageEventDefinition');

    var endEvent = moddle.create('bpmn:EndEvent', {
      eventDefinitions: [ msgEvtDef ]
    });

    var canCloneProperty = extension.canCloneProperty(endEvent, msgEvtDef, connector.$descriptor);

    // then
    expect(canCloneProperty).to.be.true;

  });


  it('can NOT clone "field" -> IntermediateThrowEvent without MessageEventDefinition', function() {
    // given
    var field = moddle.create('camunda:Field', {
      name: 'hello_field'
    });

    var intermediateThrowEvent = moddle.create('bpmn:IntermediateThrowEvent');

    var canCloneProperty = extension.canCloneProperty(intermediateThrowEvent, undefined, field.$descriptor);

    // then
    expect(canCloneProperty).to.not.exist;
  });


  it('can clone "FailedJobRetryTimeCycle" -> SubProcess with MultiInstanceLoopCharacteristics', function() {
    // given
    var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle', {
      body: 'foobar'
    });

    var multiInstLoopChar = moddle.create('bpmn:MultiInstanceLoopCharacteristics');

    var subProcess = moddle.create('bpmn:SubProcess', {
      loopCharacteristics: multiInstLoopChar
    });

    var canCloneProperty = extension.canCloneProperty(subProcess, multiInstLoopChar, retryCycle.$descriptor);

    // then
    expect(canCloneProperty).to.be.true;
  });

  it('can clone "Field"', function() {
    // given
    var field = moddle.create('camunda:Field', {
      name: 'hello_field'
    });

    var extensionElements = moddle.create('bpmn:ExtensionElements', { values: [ field ] });

    var msgEvtDef = moddle.create('bpmn:MessageEventDefinition', {
      extensionElements: extensionElements
    });

    var msgIntermThrowEvt = moddle.create('bpmn:IntermediateThrowEvent', {
      eventDefinitions: [ msgEvtDef ]
    });

    var canCloneProperty = extension.canCloneProperty(msgIntermThrowEvt, msgEvtDef, field.$descriptor);

    // then
    expect(canCloneProperty).to.be.true;
  });

});

'use strict';

var CamundaModdleExtension = require('../../lib/extension');

var createModdle = require('../helper').createModdle;


describe('extension', function() {

  var camundaModdleExtension,
      moddle;

  beforeEach(function() {
    camundaModdleExtension = new CamundaModdleExtension(new EventBusMock());

    moddle = createModdle();
  });


  describe('connector', function() {

    it('should allow if parent has MessageEventDefinition', function() {

      // given
      var connector = moddle.create('camunda:Connector'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          messageEndEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = messageEventDefinition;

      messageEventDefinition.$parent = messageEndEvent;
      messageEventDefinition.extensionElements = extensionElements;

      messageEndEvent.eventDefinitions = [ messageEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(connector, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should NOT allow if parent has no MessageEventDefinition', function() {

      // given
      var connector = moddle.create('camunda:Connector'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          signalEventDefinition = moddle.create('bpmn:SignalEventDefinition'),
          signalEndEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = signalEventDefinition;

      signalEventDefinition.$parent = signalEndEvent;
      signalEventDefinition.extensionElements = extensionElements;

      signalEndEvent.eventDefinitions = [ signalEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(connector, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should NOT allow if parent is not IntermediateThrowEvent or EndEvent', function() {

      // given
      var connector = moddle.create('camunda:Connector'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          messageStartEvent = moddle.create('bpmn:StartEvent');

      extensionElements.$parent = messageEventDefinition;

      messageEventDefinition.$parent = messageStartEvent;
      messageEventDefinition.extensionElements = extensionElements;

      messageStartEvent.eventDefinitions = [ messageEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(connector, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

  });


  describe('field', function() {

    it('should allow if parent has MessageEventDefinition', function() {

      // given
      var field = moddle.create('camunda:Field'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
          messageEndEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = messageEventDefinition;

      messageEventDefinition.$parent = messageEndEvent;
      messageEventDefinition.extensionElements = extensionElements;

      messageEndEvent.eventDefinitions = [ messageEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(field, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should NOT allow if parent has no MessageEventDefinition', function() {

      // given
      var field = moddle.create('camunda:Field'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          signalEventDefinition = moddle.create('bpmn:SignalEventDefinition'),
          signalEndEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = signalEventDefinition;

      signalEventDefinition.$parent = signalEndEvent;
      signalEventDefinition.extensionElements = extensionElements;

      signalEndEvent.eventDefinitions = [ signalEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(field, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should NOT allow if parent is not IntermediateThrowEvent or EndEvent', function() {

      // given
      var field = moddle.create('camunda:Field'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          signalEventDefinition = moddle.create('bpmn:SignalEventDefinition'),
          signalStartEvent = moddle.create('bpmn:StartEvent');

      extensionElements.$parent = signalEventDefinition;

      signalEventDefinition.$parent = signalStartEvent;
      signalEventDefinition.extensionElements = extensionElements;

      signalStartEvent.eventDefinitions = [ signalEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(field, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

  });


  describe('retry cycle', function() {

    it('should allow if parent has SignalEventDefinition and is IntermediateThrowEvent',
      function() {

        // given
        var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle'),
            extensionElements = moddle.create('bpmn:ExtensionElements'),
            signalEventDefinition = moddle.create('bpmn:SignalEventDefinition'),
            signalIntermediateThrowEvent = moddle.create('bpmn:IntermediateThrowEvent');

        extensionElements.$parent = signalEventDefinition;

        signalEventDefinition.$parent = signalIntermediateThrowEvent;
        signalEventDefinition.extensionElements = extensionElements;

        signalIntermediateThrowEvent.eventDefinitions = [ signalEventDefinition ];

        // when
        var canCopyProperty = camundaModdleExtension.canCopyProperty(retryCycle, extensionElements);

        // then
        expect(canCopyProperty).not.to.be.false;
      }
    );


    it('should NOT allow if parent has SignalEventDefinition and is not IntermediateThrowEvent',
      function() {

        // given
        var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle'),
            extensionElements = moddle.create('bpmn:ExtensionElements'),
            signalEventDefinition = moddle.create('bpmn:SignalEventDefinition'),
            signalStartEvent = moddle.create('bpmn:StartEvent');

        extensionElements.$parent = signalEventDefinition;

        signalEventDefinition.$parent = signalStartEvent;
        signalEventDefinition.extensionElements = extensionElements;

        signalStartEvent.eventDefinitions = [ signalEventDefinition ];

        // when
        var canCopyProperty = camundaModdleExtension.canCopyProperty(retryCycle, extensionElements);

        // then
        expect(canCopyProperty).to.be.false;
      }
    );


    it('should allow if parent has TimerEventDefinition is catching', function() {

      // given
      var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          timerEventDefinition = moddle.create('bpmn:TimerEventDefinition'),
          timerIntermediateCatchEvent = moddle.create('bpmn:IntermediateCatchEvent');

      extensionElements.$parent = timerEventDefinition;

      timerEventDefinition.$parent = timerIntermediateCatchEvent;
      timerEventDefinition.extensionElements = extensionElements;

      timerIntermediateCatchEvent.eventDefinitions = [ timerEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(retryCycle, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should NOT allow if parent has TimerEventDefinition and is not catching', function() {

      // given
      var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          timerEventDefinition = moddle.create('bpmn:TimerEventDefinition'),
          timerEndEvent = moddle.create('bpmn:EndEvent');

      extensionElements.$parent = timerEventDefinition;

      timerEventDefinition.$parent = timerEndEvent;
      timerEventDefinition.extensionElements = extensionElements;

      timerEndEvent.eventDefinitions = [ timerEventDefinition ];

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(retryCycle, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });


    it('should NOT allow if parent has no SignalEventDefinition or TimerEventDefinition',
      function() {

        // given
        var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle'),
            extensionElements = moddle.create('bpmn:ExtensionElements'),
            messageEventDefinition = moddle.create('bpmn:MessageEventDefinition'),
            messageIntermediateCatchEvent = moddle.create('bpmn:IntermediateCatchEvent');

        extensionElements.$parent = messageEventDefinition;

        messageEventDefinition.$parent = messageIntermediateCatchEvent;
        messageEventDefinition.extensionElements = extensionElements;

        messageIntermediateCatchEvent.eventDefinitions = [ messageEventDefinition ];

        // when
        var canCopyProperty = camundaModdleExtension.canCopyProperty(retryCycle, extensionElements);

        // then
        expect(canCopyProperty).to.be.false;
      }
    );


    it('should allow if parent is loop characteristics', function() {

      // given
      var retryCycle = moddle.create('camunda:FailedJobRetryTimeCycle'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics');

      extensionElements.$parent = loopCharacteristics;

      loopCharacteristics.extensionElements = extensionElements;

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(retryCycle, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });

  });


  describe('task listener', function() {

    it('should allow if parent is user task', function() {

      // given
      var taskListener = moddle.create('camunda:TaskListener'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          userTask = moddle.create('bpmn:UserTask');

      extensionElements.$parent = userTask;

      userTask.extensionElements = extensionElements;

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(taskListener, extensionElements);

      // then
      expect(canCopyProperty).not.to.be.false;
    });


    it('should NOT allow if parent is not user task', function() {

      // given
      var taskListener = moddle.create('camunda:TaskListener'),
          extensionElements = moddle.create('bpmn:ExtensionElements'),
          serviceTask = moddle.create('bpmn:ServiceTask');

      extensionElements.$parent = serviceTask;

      serviceTask.extensionElements = extensionElements;

      // when
      var canCopyProperty = camundaModdleExtension.canCopyProperty(taskListener, extensionElements);

      // then
      expect(canCopyProperty).to.be.false;
    });

  });

});

// helpers //////////

function EventBusMock() {
  this.on = function() {};
}
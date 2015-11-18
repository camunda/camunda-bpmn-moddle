'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('camunda:async', function() {

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-camunda-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            async: true
          });

          done(err);
        });

      });


      it('on SignalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/signalEventDefinition-camunda-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:SignalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:SignalEventDefinition',
            async: true
          });

          done(err);
        });

      });

    });


    describe('camunda:errorCodeVariable', function() {

      it('on ErrorEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/errorEventDefinition-camunda-errorCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ErrorEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ErrorEventDefinition',
            errorCodeVariable: 'errorCode'
          });

          done(err);
        });

      });

    });


    describe('camunda:escalationCodeVariable', function() {

      it('on EscalationEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/escalationEventDefinition-camunda-escalationCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:EscalationEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:EscalationEventDefinition',
            escalationCodeVariable: 'escalationCode'
          });

          done(err);
        });

      });

    });


    it('camunda:script', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-script.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Script', function(err, script) {

        // then
        expect(script).to.jsonEqual({
          $type: 'camunda:Script',
          scriptFormat: 'groovy',
          resource: 'null',
          value: 'foo = bar;'
        });

        done(err);
      });
    });


    it('camunda:properties', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-properties.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Properties', function(err, properties) {

        // then
        expect(properties).to.jsonEqual({
          $type: 'camunda:Properties',
          values: [
            {
              $type: 'camunda:Property'
            }
          ]
        });

        done(err);
      });
    });


    describe('bpmn:ScriptTask', function() {

      it('extended by camunda:resource, camunda:resultVariable', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/scriptTask.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ScriptTask', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ScriptTask',
            scriptFormat: 'python',
            resource: 'some-file.py',
            resultVariable: 'result'
          });

          done(err);
        });
      });

    });

    it.skip('camunda:formData', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-formData.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:FormData', function(err, formData) {

        // then
        expect(formData).to.jsonEqual({
          $type: 'camunda:FormData',
          fields: [
            {
              $type: 'camunda:FormField',
              id: 'stringField',
              label: 'String Field',
              type: 'string',
              defaultValue: 'someString',
              properties: [
                {
                  $type: 'camunda:FormProperty',
                  id: 'p1',
                  value: 'property1'
                },
                {
                  $type: 'camunda:FormProperty',
                  id: 'p2',
                  value: 'property2'
                }
              ]
            }
          ]
        });

        done(err);
      });

    });


    describe('camunda:executionListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            'class': 'my.company.Listener'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            script: {
              $type: 'camunda:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });

    });


    it('camunda:taskListener', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-taskListener.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:TaskListener', function(err, taskListener) {

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'camunda:TaskListener',
          event: 'create',
          class: 'org.camunda.bpm.engine.test.bpmn.usertask.UserTaskTestCreateTaskListener',
          delegateExpression: "${myTaskListener}",
          expression: '${myTaskListener.notify(task, task.eventName)}'
        });

        done(err);
      });
    });

  });

});
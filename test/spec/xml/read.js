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
        var xml = readFile('test/fixtures/xml/camunda-async-serviceTask.part.bpmn');

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
        var xml = readFile('test/fixtures/xml/camunda-async-signalEventDefinition.part.bpmn');

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


    it('camunda:errorCodeVariable on ErrorEventDefinition', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-errorCodeVariable-errorEventDefinition.part.bpmn');

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


    it('camunda:escalationCodeVariable on EscalationEventDefinition', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-escalationCodeVariable-escalationEventDefinition.part.bpmn');

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


    it.skip('camunda:properties', function(done) {

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


    it('camunda:executionListener', function(done) {

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
  });

});
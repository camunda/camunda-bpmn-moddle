import {
  bootstrapModeler,
  inject
} from 'bpmn-js/test/helper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import bpmnCopyPasteModule from 'bpmn-js/lib/features/copy-paste';

import camundaDescriptor from '../../resources/camunda.json';
import camundaExtension from '../../lib';

import diagramXML from '../fixtures/xml/remove_variable_event.bpmn';


describe('browser - RemoveVariableEventBehaviour', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      modelingModule,
      bpmnCopyPasteModule,
      camundaExtension
    ],
    moddleExtensions: {
      camunda: camundaDescriptor,
    }
  }));


  describe('remove variableEvents property', function() {

    describe('when conditional startEvent is moved out of event subprocess', function() {

      var startEvent,
          startBusinessObject,
          eventSubProcess,
          eventDefinitions,
          root;

      it('should not have an variableEvents property', inject(function(elementRegistry, modeling, canvas) {

        // given
        root = canvas.getRootElement();
        startEvent = elementRegistry.get('startEvent_1');
        startBusinessObject = getBusinessObject(startEvent);
        eventDefinitions = startBusinessObject.get('eventDefinitions');
        eventSubProcess = elementRegistry.get('Activity_subprocess1');


        // assume
        eventDefinitions.forEach(def => {

          expect(def.get('camunda:variableEvents')).to.not.be.undefined;

        });

        // when
        modeling.moveShape(startEvent, { x: eventSubProcess.width, y: eventSubProcess.height }, root);

        eventDefinitions = startBusinessObject.get('eventDefinitions');

        // then
        eventDefinitions.forEach(def => {

          expect(def.get('camunda:variableEvents')).to.be.undefined;

        });

      }));

    });


    describe('when conditional startEvent is moved out to another event subprocess', function() {

      var startEvent,
          startBusinessObject,
          eventSubProcess,
          eventDefinitions;

      it('should maintain variableEvents property', inject(function(elementRegistry, modeling, canvas) {

        // given
        startEvent = elementRegistry.get('startEvent_1');
        startBusinessObject = getBusinessObject(startEvent);
        eventDefinitions = startBusinessObject.get('eventDefinitions');
        eventSubProcess = elementRegistry.get('Activity_subprocess2');


        // assume
        eventDefinitions.forEach(def => {

          expect(def.get('camunda:variableEvents')).to.not.be.undefined;

        });

        // when
        modeling.moveShape(startEvent, { x: 0, y: eventSubProcess.height }, eventSubProcess);

        // then
        eventDefinitions.forEach(def => {

          expect(def.get('camunda:variableEvents')).to.not.be.undefined;

        });

      }));

    });

    describe('when conditional startEvent with variableEvents property is created out of event subprocess', function() {

      var root,
          eventBusinessObject,
          eventDefinition;

      it('should not have variableEvents property', inject(function(canvas, modeling, bpmnFactory) {

        // given
        root = canvas.getRootElement();
        eventDefinition = bpmnFactory.create('bpmn:ConditionalEventDefinition', { variableEvents:'abc' });
        eventBusinessObject = bpmnFactory.create('bpmn:StartEvent', { eventDefinitions: [eventDefinition] });

        // when
        modeling.createShape({ type: 'bpmn:StartEvent' , businessObject: eventBusinessObject }, { x: 0, y: 0 }, root);

        // then
        eventBusinessObject.get('eventDefinitions').forEach(def => {

          expect(def.get('camunda:variableEvents')).to.be.undefined;

        });

      }));

    });

  });

});
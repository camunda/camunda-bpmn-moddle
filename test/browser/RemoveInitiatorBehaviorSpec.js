import {
  bootstrapModeler,
  inject
} from 'bpmn-js/test/helper';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import bpmnCopyPasteModule from 'bpmn-js/lib/features/copy-paste';

import camundaDescriptor from '../../resources/camunda.json';
import camundaExtension from '../../lib';

import diagramXML from '../fixtures/xml/remove_initiator.bpmn';


describe('browser - RemoveInitiatorBehaviour', function() {

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


  describe('remove initiator property', function() {

    describe('when event is moved to subprocess', function() {

      var startEvent,
          startBusinessObject,
          subProcess;

      it('should not have an initiator property', inject(function(elementRegistry, modeling) {

        // given
        startEvent = elementRegistry.get('StartEvent_1');
        subProcess = elementRegistry.get('Activity_subprocess1');
        startBusinessObject = getBusinessObject(startEvent);

        // assume
        expect(startBusinessObject.get('camunda:initiator')).to.not.be.undefined;

        // when
        modeling.moveShape(startEvent, { x: (subProcess.x + subProcess.width / 4), y: (subProcess.y + subProcess.height / 4) }, subProcess);

        // then
        expect(startBusinessObject.get('camunda:initiator')).to.be.undefined;

      }));

    });


    describe('when event is created within a subprocess', function() {

      var startBusinessObject,
          subProcess;

      it('should not have an initiator property', inject(function(elementRegistry, modeling, bpmnFactory) {

        // given
        subProcess = elementRegistry.get('Activity_subprocess1');
        startBusinessObject = bpmnFactory.create('bpmn:StartEvent', { initiator:'abc' });

        // when
        modeling.createShape({ type: 'bpmn:StartEvent', businessObject:startBusinessObject }, { x: 0, y: 0 }, subProcess);

        // then
        expect(startBusinessObject.get('camunda:initiator')).to.be.undefined;

      }));

    });


    describe('when event with property and subprocess as parent is moved', function() {

      var startEvent,
          startBusinessObject,
          subProcess;

      it('should not have an initiator property', inject(function(elementRegistry, modeling, elementFactory, canvas, copyPaste) {

        // given
        startEvent = elementRegistry.get('StartEvent_2');
        subProcess = elementRegistry.get('Activity_subprocess1');
        startBusinessObject = getBusinessObject(startEvent);

        // assume
        expect(startBusinessObject.get('camunda:initiator')).to.not.be.undefined;

        // when
        modeling.moveShape(startEvent, { x: (subProcess.x + subProcess.width / 4), y: (subProcess.y + subProcess.height / 4) });

        // then
        expect(startBusinessObject.get('camunda:initiator')).to.be.undefined;

      }));

    });


  });

});

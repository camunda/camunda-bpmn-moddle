'use strict';

var bootstrapModeler = require('bpmn-js/test/helper').bootstrapModeler,
    inject = require('bpmn-js/test/helper').inject;

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

var coreModule = require('bpmn-js/lib/core').default;

var modelingModule = require('bpmn-js/lib/features/modeling').default;

var bpmnCopyPasteModule = require('bpmn-js/lib/features/copy-paste').default;

var camundaDescriptor = require('../../resources/camunda');
var camundaExtension = require('../../lib');


var diagramXML = require('../fixtures/xml/remove_initiator.bpmn').default;


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
        modeling.moveShape(startEvent, { x: (subProcess.x+subProcess.width/4), y: (subProcess.y+subProcess.height/4) }, subProcess);

        // then
        expect(startBusinessObject.get('camunda:initiator')).to.be.undefined;

      }
      ));

    });


  });

});
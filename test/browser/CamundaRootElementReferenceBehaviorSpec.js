'use strict';

var bootstrapModeler = require('bpmn-js/test/helper').bootstrapModeler,
    getBpmnJS = require('bpmn-js/test/helper').getBpmnJS,
    inject = require('bpmn-js/test/helper').inject;

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    is = require('bpmn-js/lib/util/ModelUtil').is;

var find = require('min-dash').find,
    matchPattern = require('min-dash').matchPattern;

var coreModule = require('bpmn-js/lib/core').default;

var modelingModule = require('bpmn-js/lib/features/modeling').default;

var bpmnCopyPasteModule = require('bpmn-js/lib/features/copy-paste').default;

var camundaDescriptor = require('../../resources/camunda');
var camundaExtension = require('../../lib');

var collectionRemove = require('diagram-js/lib/util/Collections').remove;

var diagramXML = require('../fixtures/xml/RootElementReferenceBehavior.bpmn').default;


describe('integration', function() {

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


  describe('copy/paste external service task', function() {

    describe('without any camunda:ErrorEventDefinition', function() {

      var copiedServiceTask,
          pastedServiceTask,
          copiedBusinessObject,
          pastedBusinessObject;


      beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, canvas) {

        // given
        copiedServiceTask = elementRegistry.get('ServiceTask_1');
        copiedBusinessObject = getBusinessObject(copiedServiceTask);

        // assume
        expect(getExtensionElementsOfType(copiedBusinessObject, 'camunda:ErrorEventDefinition').length).to.eql(0);

        // when
        copyPaste.copy(copiedServiceTask);

        pastedServiceTask = copyPaste.paste({
          element: canvas.getRootElement(),
          point: {
            x: copiedServiceTask.x,
            y: copiedServiceTask.y
          },
        })[0];

        pastedBusinessObject = getBusinessObject(pastedServiceTask);

      }));


      it('should not create a camunda:ErrorEventDefinition on paste', function() {

        // then
        expect(getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition').length).to.eql(0);
      });

    });


    describe('with one camunda:ErrorEventDefinition', function() {

      var copiedServiceTask,
          pastedServiceTask,
          copiedBusinessObject,
          pastedBusinessObject,
          referencedRootElement,
          pastedRootElement;


      describe('without altering the copied service task', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_2');
          copiedBusinessObject = getBusinessObject(copiedServiceTask);

          // when
          copyPaste.copy(copiedServiceTask);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];

          pastedBusinessObject = getBusinessObject(pastedServiceTask);
        }));


        it('should copy the errorRef on paste', function() {

          // then
          expect(getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition')[0].errorRef).to.exist;
        });


        it('should not add temporary attributes to shape on paste', function() {

          // then
          expect(pastedServiceTask.referencedRootElements).not.to.exist;
        });
      });


      describe('removing the copied service task', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, modeling, copyPaste, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_2');
          copiedBusinessObject = getBusinessObject(copiedServiceTask);

          // when
          copyPaste.copy(copiedServiceTask);

          modeling.removeShape(copiedServiceTask);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];

          pastedBusinessObject = getBusinessObject(pastedServiceTask);
        }));


        it('should copy the errorRef on paste', function() {

          // then
          expect(getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition')[0].errorRef).to.exist;
        });

      });


      describe('without altering the root bpmn:Error', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, modeling, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_2');
          copiedBusinessObject = getBusinessObject(copiedServiceTask);
          referencedRootElement = getExtensionElementsOfType(copiedBusinessObject, 'camunda:ErrorEventDefinition')[0].errorRef;

          // remove all root errors except the referenced one
          var rootElements = getRootElementsOfType('bpmn:Error');

          rootElements.forEach(function(element) {
            if (element.id !== referencedRootElement.id) {
              collectionRemove(bpmnjs.getDefinitions().get('rootElements'), element);
            }
          });

          // assume
          expect(hasRootElement(referencedRootElement)).to.be.true;
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(1);

          // when
          copyPaste.copy(copiedServiceTask);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];
        }));


        it('should not create an additional root bpmn:Error', function() {

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(1);
        });

      });


      describe('removing the root bpmn:Error', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, modeling, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_2');

          copiedBusinessObject = getBusinessObject(copiedServiceTask);

          referencedRootElement = getExtensionElementsOfType(copiedBusinessObject, 'camunda:ErrorEventDefinition')[0].errorRef;

          // when
          copyPaste.copy(copiedServiceTask);

          // remove all root errors
          var rootElements = getRootElementsOfType('bpmn:Error');

          rootElements.forEach(function(element) {
            collectionRemove(bpmnjs.getDefinitions().get('rootElements'), element);
          });

          // assume
          expect(hasRootElement(referencedRootElement)).to.be.false;
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(0);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];

          pastedBusinessObject = getBusinessObject(pastedServiceTask);

          pastedRootElement = getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition')[0].errorRef;
        }));


        it('should do', function() {

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(1);
          expect(hasRootElement(referencedRootElement)).to.be.false;
          expect(hasRootElement(pastedRootElement)).to.be.true;
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(0);
          expect(hasRootElement(referencedRootElement)).to.be.false;
          expect(hasRootElement(pastedRootElement)).to.be.false;
        }));


        it('should redo', inject(function(commandStack) {

          // given
          commandStack.undo();

          // when
          commandStack.redo();

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(1);
          expect(hasRootElement(referencedRootElement)).to.be.false;
          expect(hasRootElement(pastedRootElement)).to.be.true;
        }));

      });
    });


    describe('with multiple camunda:ErrorEventDefinition', function() {

      var copiedServiceTask,
          pastedServiceTask,
          copiedBusinessObject,
          pastedBusinessObject,
          referencedRootElements,
          pastedRootElements;

      describe('without altering any root bpmn:Error', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, modeling, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_3');

          copiedBusinessObject = getBusinessObject(copiedServiceTask);

          // assume
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(3);

          // when
          copyPaste.copy(copiedServiceTask);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];

          pastedBusinessObject = getBusinessObject(pastedServiceTask);

          var extensionElements = getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition');

          pastedRootElements = extensionElements.map(function(extensionElement) {
            return extensionElement.errorRef;
          });
        }));


        it('should not create any additional bpmn:Error', function() {

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(3);

          pastedRootElements.forEach(function(referencedRootElement) {
            expect(hasRootElement(referencedRootElement)).to.be.true;
          });
        });

      });


      describe('removing one root bpmn:Error', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, modeling, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_3');

          copiedBusinessObject = getBusinessObject(copiedServiceTask);

          var extensionElements = getExtensionElementsOfType(copiedBusinessObject, 'camunda:ErrorEventDefinition');

          referencedRootElements = extensionElements.map(function(extensionElement) {
            return extensionElement.errorRef;
          });

          // remove one referenced root error
          collectionRemove(bpmnjs.getDefinitions().get('rootElements'), referencedRootElements[1]);


          // assume
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(2);

          // when
          copyPaste.copy(copiedServiceTask);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];

          pastedBusinessObject = getBusinessObject(pastedServiceTask);

          extensionElements = getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition');

          pastedRootElements = extensionElements.map(function(extensionElement) {
            return extensionElement.errorRef;
          });
        }));


        it('should recreate the missing root bpmn:Error', function() {

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(3);
          expect(hasRootElement(pastedRootElements[1])).to.be.true;
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(2);
          expect(hasRootElement(pastedRootElements[1])).to.be.false;
        }));


        it('should redo', inject(function(commandStack) {

          // given
          commandStack.undo();

          // when
          commandStack.redo();

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(3);
          expect(hasRootElement(pastedRootElements[1])).to.be.true;
        }));

      });


      describe('removing every root bpmn:Error', function() {

        beforeEach(inject(function(bpmnjs, elementRegistry, copyPaste, modeling, canvas) {

          // given
          copiedServiceTask = elementRegistry.get('ServiceTask_3');

          copiedBusinessObject = getBusinessObject(copiedServiceTask);

          var extensionElements = getExtensionElementsOfType(copiedBusinessObject, 'camunda:ErrorEventDefinition');

          referencedRootElements = extensionElements.map(function(extensionElement) {
            return extensionElement.errorRef;
          });

          // remove all root errors
          var rootElements = getRootElementsOfType('bpmn:Error');

          rootElements.forEach(function(element) {
            collectionRemove(bpmnjs.getDefinitions().get('rootElements'), element);
          });

          // assume
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(0);

          // when
          copyPaste.copy(copiedServiceTask);

          pastedServiceTask = copyPaste.paste({
            element: canvas.getRootElement(),
            point: {
              x: copiedServiceTask.x,
              y: copiedServiceTask.y
            },
          })[0];

          pastedBusinessObject = getBusinessObject(pastedServiceTask);

          extensionElements = getExtensionElementsOfType(pastedBusinessObject, 'camunda:ErrorEventDefinition');

          pastedRootElements = extensionElements.map(function(extensionElement) {
            return extensionElement.errorRef;
          });
        }));


        it('should recreate every missing root bpmn:Error', function() {

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(3);
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(0);
        }));


        it('should redo', inject(function(commandStack) {

          // given
          commandStack.undo();

          // when
          commandStack.redo();

          // then
          expect(getRootElementsOfType('bpmn:Error').length).to.eql(3);
        }));

      });

    });

  });

});

// helper ////

function getExtensionElementsOfType(bo, type) {
  var extensionElements = bo.get('extensionElements');
  var filteredExtensionElements = [];

  if (extensionElements) {
    filteredExtensionElements = extensionElements.values.filter(function(element) {
      return is(element, type);
    });
  }

  return filteredExtensionElements;
}

function getRootElementsOfType(type) {
  var definitions = getBpmnJS().getDefinitions(),
      rootElements = definitions.get('rootElements');

  return rootElements.filter(function(element) {
    return is(element, type);
  });
}

function hasRootElement(rootElement) {
  var definitions = getBpmnJS().getDefinitions(),
      rootElements = definitions.get('rootElements');

  return !!rootElement && !!find(rootElements, matchPattern({ id: rootElement.id }));
}

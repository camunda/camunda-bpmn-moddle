'use strict';

var inherits = require('inherits');

var find = require('min-dash').find,
    matchPattern = require('min-dash').matchPattern;

var CommandInterceptor = require('diagram-js/lib/command/CommandInterceptor').default;

var collectionAdd = require('diagram-js/lib/util/Collections').add,
    collectionRemove = require('diagram-js/lib/util/Collections').remove;

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    is = require('bpmn-js/lib/util/ModelUtil').is;

var LOW_PRIORITY = 500;


/**
 * Add referenced root elements (bpmn:Error) if they don't exist.
 * Copy referenced root elements on copy & paste.
 */
function CamundaRootElementReferenceBehavior(
    bpmnjs, eventBus, injector, moddleCopy, bpmnFactory
) {

  injector.invoke(CommandInterceptor, this);

  function hasRootElement(rootElement) {
    var definitions = bpmnjs.getDefinitions(),
        rootElements = definitions.get('rootElements');

    return !!find(rootElements, matchPattern({ id: rootElement.id }));
  }

  function getRootElements(bo, type) {
    var extensionElements = bo.get('extensionElements');
    var filteredExtensionElements = [];

    if (extensionElements) {
      filteredExtensionElements = extensionElements.values.filter(function(element) {
        return is(element, type);
      });
    }

    var rootElements = filteredExtensionElements.map(function(element) {
      return element[getRootElementReferencePropertyName(element)];
    });

    return rootElements;
  }

  function setRootElement(bo, rootElement, index) {
    var extensionElement = bo.get('extensionElements').values[index];

    extensionElement.set(getRootElementReferencePropertyName(extensionElement), rootElement);
  }

  // create shape
  this.executed('shape.create', function(context) {

    var shape = context.shape,
        businessObject = getBusinessObject(shape);

    if (!canHaveNestedRootElementReference(businessObject)) {
      return;
    }

    var referencedRootElements = getRootElements(businessObject, getReferencingElement(shape)),
        rootElements = bpmnjs.getDefinitions().get('rootElements');

    context.addedRootElements = [];

    referencedRootElements.forEach(function(element) {
      if (!hasRootElement(element)) {

        // add root element
        collectionAdd(rootElements, element);

        context.addedRootElements.push(element);
      }
    });
  }, true);

  this.reverted('shape.create', function(context) {
    var addedRootElements = context.addedRootElements;

    if (!addedRootElements) {
      return;
    }

    var rootElements = bpmnjs.getDefinitions().get('rootElements');

    // remove root elements
    addedRootElements.forEach(function(addedRootElement) {
      collectionRemove(rootElements, addedRootElement);
    });
  }, true);

  eventBus.on('copyPaste.copyElement', function(context) {
    var descriptor = context.descriptor,
        element = context.element,
        businessObject = getBusinessObject(element);

    if (!canHaveNestedRootElementReference(businessObject)) {
      return;
    }

    var rootElements = getRootElements(businessObject, getReferencingElement(element));

    if (rootElements) {
      descriptor.referencedRootElements = rootElements;
    }
  });


  eventBus.on('copyPaste.pasteElement', LOW_PRIORITY, function(context) {
    var descriptor = context.descriptor,
        businessObject = descriptor.businessObject;

    if (!canHaveNestedRootElementReference(businessObject)) {
      return;
    }

    var referencedRootElements = descriptor.referencedRootElements;

    if (referencedRootElements && referencedRootElements.length) {

      referencedRootElements.forEach(function(element, index) {
        if (!hasRootElement(element)) {
          element = moddleCopy.copyElement(
            element,
            bpmnFactory.create(element.$type)
          );
        }
        setRootElement(businessObject, element, index);
      });
    }

    delete descriptor.referencedRootElements;
  });
}

// Helpers

function getReferencingElement(element) {
  if (is(element, 'bpmn:ServiceTask')) {
    return 'camunda:ErrorEventDefinition';
  }
}

function getRootElementReferencePropertyName(bo) {
  if (is(bo, 'camunda:ErrorEventDefinition')) {
    return 'errorRef';
  }
}

function canHaveNestedRootElementReference(bo) {
  var isExternalServiceTask = is(bo, 'bpmn:ServiceTask') && bo.type === 'external';
  return isExternalServiceTask;
}


CamundaRootElementReferenceBehavior.$inject = [
  'bpmnjs',
  'eventBus',
  'injector',
  'moddleCopy',
  'bpmnFactory'
];

inherits(CamundaRootElementReferenceBehavior, CommandInterceptor);

module.exports = CamundaRootElementReferenceBehavior;

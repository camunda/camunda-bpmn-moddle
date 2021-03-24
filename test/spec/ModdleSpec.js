'use strict';

var readFile = require('../helper').readFile,
    createModdle = require('../helper').createModdle;

var BpmnModdle = require('bpmn-moddle');

var camundaDescriptor = require('../../resources/camunda');


describe('camunda-bpmn-moddle', function() {

  describe('schema', function() {

    it('should provide model', function() {

      // then
      expect(camundaDescriptor).to.exist;

      expect(camundaDescriptor.uri).to.eql('http://camunda.org/schema/1.0/bpmn');
      expect(camundaDescriptor.prefix).to.eql('camunda');
    });

  });


  describe('behavior', function() {

    it('should extend bpmn-moddle', function() {

      // given
      var moddle = new BpmnModdle({
        camunda: camundaDescriptor
      });

      // when
      var serviceTask = moddle.create('bpmn:ServiceTask');

      // then
      expect(serviceTask.$instanceOf('camunda:ServiceTaskLike')).to.be.true;
    });


    it('should ignore id property on camunda:FormField', async function() {

      var xml = readFile('test/fixtures/xml/camunda-formField-ids.bpmn');

      var moddle = createModdle();

      // when
      var {
        elementsById,
        warnings
      } = await moddle.fromXML(xml, 'bpmn:Definitions');

      // then
      expect(warnings).to.be.empty;
      expect(elementsById).not.to.have.property('variableA');
    });

  });

});
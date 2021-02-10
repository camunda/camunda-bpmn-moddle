'use strict';

var readFile = require('../helper').readFile,
    createModdle = require('../helper').createModdle;


describe('ids', function() {

  describe('id validation', function() {

    it('should ignore id property on camunda:FormField', async function() {

      var xml = readFile('test/fixtures/xml/camunda-formField-ids.bpmn');

      var moddle = createModdle();

      // when
      var { elementsById, warnings } = await moddle.fromXML(xml, 'bpmn:Definitions');

      // then
      expect(warnings).to.be.empty;
      expect(elementsById).not.to.have.property('variableA');
    });

  });

});
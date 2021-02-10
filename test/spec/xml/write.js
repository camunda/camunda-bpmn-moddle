'use strict';

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  async function write(element) {
    return await moddle.toXML(element, { preamble: false });
  }


  describe('should export types', function() {

    it('Field#stringValue', async function() {

      // given
      var fieldElem = moddle.create('camunda:Field', {
        name: 'Field_1',
        stringValue: 'myFieldValue'
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" ' +
              'name="Field_1" stringValue="myFieldValue" />';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('Field#string', async function() {

      // given
      var fieldElem = moddle.create('camunda:Field', {
        name: 'Field_1',
        string: 'myStringValue'
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" name="Field_1">' +
          '<camunda:string>myStringValue</camunda:string>' +
        '</camunda:field>';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });


    it('Field#expression', async function() {

      // given
      var fieldElem = moddle.create('camunda:Field', {
        name: 'Field_1',
        expression: '${myExpressionValue}'
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" name="Field_1">' +
          '<camunda:expression>${myExpressionValue}</camunda:expression>' +
        '</camunda:field>';

      // when
      var { xml } = await write(fieldElem);

      // then
      expect(xml).to.eql(expectedXML);
    });

  });

});

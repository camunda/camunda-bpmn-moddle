'use strict';

var assign = require('min-dash').assign,
    isFunction = require('min-dash').isFunction;

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  function write(element, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    // skip preamble for tests
    options = assign({ preamble: false }, options);

    moddle.toXML(element, options, callback);
  }


  describe('should export types', function() {

    it('Field#stringValue', function(done) {

      // given
      var fieldElem = moddle.create('camunda:Field', {
        name: 'Field_1',
        stringValue: 'myFieldValue'
      });

      var expectedXML =
        '<camunda:field xmlns:camunda="http://camunda.org/schema/1.0/bpmn" ' +
              'name="Field_1" stringValue="myFieldValue" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('Field#string', function(done) {

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
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


    it('Field#expression', function(done) {

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
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


  });

});

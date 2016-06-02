'use strict';

var readFile = require('../helper').readFile,
    createModdle = require('../helper').createModdle;


describe('ids', function() {

  describe('id validation', function() {

    it('should ignore id property on camunda:FormField', function(done) {

      var xml = readFile('test/fixtures/xml/camunda-formField-ids.bpmn');

      var moddle = createModdle();

      // when
      moddle.fromXML(xml, 'bpmn:Definitions', function(err, definitions, context) {

        if (err) {
          return done(err);
        }

        var elementsById = context.elementsById;

        // then
        expect(context.warnings).to.be.empty;

        expect(elementsById).not.to.have.property('variableA');

        done();
      });

    });

  });

});
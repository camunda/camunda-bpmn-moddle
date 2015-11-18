'use strict';

var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;



describe('import -> export roundtrip', function() {

  var moddle;

  beforeEach(function() {
    moddle = createModdle();
  });


  function validateExport(file) {

    return function(done) {

      var xml = readFile(file);

      moddle.fromXML(xml, 'bpmn:Definitions', function(err, definitions) {
        if (err) {
          return done(err);
        }

        moddle.toXML(definitions, function(err, savedXML) {

          if (err) {
            return done(err);
          }

          expect(savedXML).to.eql(xml);
        });
      });
    };
  }


  describe('should keep camunda attributes', function() {

    describe('bpmn:UserTask', function() {

      it.skip('camunda:FormData', validateExport('test/fixtures/xml/userTask-camunda-formData.bpmn'));

    });

  });

});
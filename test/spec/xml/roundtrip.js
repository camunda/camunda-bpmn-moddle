'use strict';

var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;



describe('import -> export roundtrip', function() {

  function stripSpaces(xml) {
    return xml.replace(/\n|\r/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s\/>/g, '/>')
      .replace(/>\s+</g, '><');
  }

  function validateExport(file) {

    return function(done) {

      var xml = stripSpaces(readFile(file));

      var moddle = createModdle();

      moddle.fromXML(xml, 'bpmn:Definitions', function(err, definitions) {
        if (err) {
          return done(err);
        }

        moddle.toXML(definitions, function(err, savedXML) {

          if (err) {
            return done(err);
          }

          savedXML = stripSpaces(savedXML);

          expect(savedXML).to.eql(xml);

          done();
        });
      });
    };
  }


  describe('should keep camunda attributes', function() {

    it('camunda:FormData', validateExport('test/fixtures/xml/userTask-camunda-formData.bpmn'));

    it('camunda:InputOutput', validateExport('test/fixtures/xml/inputOutput-nestedList.bpmn'));

  });

});

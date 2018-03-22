'use strict';

var glob = require('glob'),
    asyncMap = require('async').map;

var readFile = require('../helper').readFile,
    createModdle = require('../helper').createModdle;

var path = require('path');

var platformPath = '../../camunda-bpm/camunda-bpm-platform';

var diagramPath = path.resolve(platformPath, 'engine/src/test/resources');


describe.skip('camunda models', function() {

  // QA takes time (!)
  this.timeout(30000);


  it('should parse camunda extensions', function(done) {

    var allFiles = [].concat(
      glob.sync('**/*.bpmn', { cwd: diagramPath, dot: true }),
      glob.sync('**/*.bpmn20.xml', { cwd: diagramPath, dot: true })
    );

    var results = {
      OK: 0,
      ERROR: 0,
      WARNINGS: 0
    };

    asyncMap(allFiles, function(f, done) {

      var fullPath = diagramPath + '/' + f;

      var xml = readFile(fullPath);
      var moddle = createModdle();

      moddle.fromXML(xml, 'bpmn:Definitions', function(err, definitions, context) {

        var warnings = context.warnings.filter(function(w) {
          return w.message.indexOf('unresolved reference') === -1;
        });

        var result = err ? 'ERROR' : (warnings.length ? 'WARNINGS' : 'OK');

        console.log('%s - %s', result, f);
        if (warnings.length) {
          console.log('\twarnings: %s', JSON.stringify(warnings));
        }

        if (err) {
          console.log('\terror: %s', warnings);
        }

        results[result]++;

        done();
      });
    }, function(err) {
      if (err) {
        return done(err);
      }

      console.log('results\n\tok: %s\n\terror: %s\n\twarnings: %s',
        results['OK'],
        results['ERROR'],
        results['WARNINGS']);

      done();
    });
  });

});
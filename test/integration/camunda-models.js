const globSync = require('glob').sync;
const pSeries = require('p-series');

const {
  readFile,
  createModdle
} = require('../helper');

const path = require('path');

const platformPath = '../../camunda-bpm/camunda-bpm-platform';

const diagramPath = path.resolve(platformPath, 'engine/src/test/resources');


describe.skip('camunda models', function() {

  // QA takes time (!)
  this.timeout(30000);


  it('should parse camunda extensions', async function() {

    const allFiles = [].concat(
      globSync('**/*.bpmn', { cwd: diagramPath, dot: true }),
      globSync('**/*.bpmn20.xml', { cwd: diagramPath, dot: true })
    );

    const results = {
      OK: 0,
      ERROR: 0,
      WARNINGS: 0
    };

    await pSeries(allFiles.map(
      async function(localPath) {

        const fullPath = diagramPath + '/' + localPath;

        const xml = readFile(fullPath);

        const result = await parseDiagram(xml);

        const warnings = result.warnings.filter(function(w) {
          return w.message.indexOf('unresolved reference') === -1;
        });

        const status = result.error ? 'ERROR' : (warnings.length ? 'WARNINGS' : 'OK');

        console.log('%s - %s', status, localPath);
        if (warnings.length) {
          console.log('\twarnings: %s', JSON.stringify(warnings));
        }

        if (result.error) {
          console.log('\terror: %s', result.error);
        }

        results[status]++;
      }
    ));

    console.log('results\n\tok: %s\n\terror: %s\n\twarnings: %s',
      results['OK'],
      results['ERROR'],
      results['WARNINGS']
    );
  });

});


// helpers ////////////////

function parseDiagram(xml) {

  const moddle = createModdle();

  return moddle.fromXML(xml, 'bpmn:Definitions').catch(error => {
    return {
      error: error,
      warnings: error.warnings
    };
  });
}
import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

export default [
  ...bpmnIoPlugin.configs.node,
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: [
        'test/**/*.js',
        'test/**/*.cjs'
      ]
    };
  })
];
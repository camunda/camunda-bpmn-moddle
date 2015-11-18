'use strict';

var BpmnModdle = require('bpmn-moddle');

var camundaDescriptor = require('../../resources/camunda');


describe('exports', function() {

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

});
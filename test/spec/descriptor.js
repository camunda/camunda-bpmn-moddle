'use strict';


describe('descriptor', function() {

  var camundaDescriptor = require('../../resources/camunda');


  it('should provide model', function() {

    // then
    expect(camundaDescriptor).to.exist;

    expect(camundaDescriptor.uri).to.eql('http://camunda.org/schema/1.0/bpmn');
    expect(camundaDescriptor.prefix).to.eql('camunda');
  });

});
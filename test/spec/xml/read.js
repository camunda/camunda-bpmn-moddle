'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('camunda:historyTimeToLive', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-camunda-historyTimeToLive.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type : 'bpmn:Process',
            historyTimeToLive : 'foo'
          });

          done(err);

        });

      });

    });


    describe('camunda:isStartableInTasklist', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-camunda-isStartableInTasklist.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type : 'bpmn:Process',
            isStartableInTasklist : true
          });

          done(err);

        });

      });


      it('default value', function() {

        // when
        var bo = moddle.create('bpmn:Process');

        // then
        expect(bo.get('camunda:isStartableInTasklist')).to.be.true;
      });

    });


    describe('camunda:priority', function() {

      it('on UserTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/userTask-camunda-priority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:UserTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'bpmn:UserTask',
            priority: '${ priority }'
          });

          done(err);
        });

      });
    });


    describe('camunda:async', function() {

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-camunda-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            async: true
          });

          done(err);
        });

      });


      it('on SignalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/signalEventDefinition-camunda-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:SignalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:SignalEventDefinition',
            async: true
          });

          done(err);
        });

      });

    });


    describe('camunda:errorCodeVariable', function() {

      it('on ErrorEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/errorEventDefinition-camunda-errorCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ErrorEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ErrorEventDefinition',
            errorCodeVariable: 'errorCode'
          });

          done(err);
        });

      });

    });


    describe('camunda:escalationCodeVariable', function() {

      it('on EscalationEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/escalationEventDefinition-camunda-escalationCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:EscalationEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:EscalationEventDefinition',
            escalationCodeVariable: 'escalationCode'
          });

          done(err);
        });

      });

    });


    describe('camunda:errorMessage', function() {

      it('on Error', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-errorMessage.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Error', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:Error',
            errorMessage: 'errorMessage'
          });

          done(err);
        });

      });

    });


    it('camunda:script', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-script.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Script', function(err, script) {

        // then
        expect(script).to.jsonEqual({
          $type: 'camunda:Script',
          scriptFormat: 'groovy',
          resource: 'null',
          value: 'foo = bar;'
        });

        done(err);
      });
    });


    it('camunda:connector', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-connector.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Connector', function(err, connector) {

        // then
        expect(connector).to.jsonEqual({
          $type: 'camunda:Connector',
          connectorId: 'connector',
          inputOutput: {
            $type: 'camunda:InputOutput',
            inputParameters: [
              {
                $type: 'camunda:InputParameter',
                name: 'in'
              }
            ],
            outputParameters: [
              {
                $type: 'camunda:OutputParameter',
                name: 'out'
              }
            ]
          }
        });

        done(err);
      });
    });


    it('camunda:properties', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-properties.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Properties', function(err, properties) {

        // then
        expect(properties).to.jsonEqual({
          $type: 'camunda:Properties',
          values: [
            {
              $type: 'camunda:Property',
              id: 'p1',
              name: 'foo',
              value: 'property1'
            }
          ]
        });

        done(err);
      });
    });


    it('camunda:potentialStarter', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-potentialStarter.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:PotentialStarter', function(err, starter) {

        // then
        expect(starter).to.jsonEqual({
          $type: 'camunda:PotentialStarter',
          resourceAssignmentExpression: {
            $type: 'bpmn:ResourceAssignmentExpression',
            expression: {
              $type: 'bpmn:FormalExpression',
              body: 'group2, group(group3), user(user3)'
            }
          }
        });

        done(err);
      });
    });


    describe('camunda:resource', function() {

      it('on FormalExpression', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/formalExpression-resource.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:FormalExpression', function(err, starter) {

          // then
          expect(starter).to.jsonEqual({
            $type: 'bpmn:FormalExpression',
            resource: 'deployment://some-file'
          });

          done(err);
        });
      });
    });


    it('camunda:in', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-in.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:In', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'camunda:In',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    it('camunda:out', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-out.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Out', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'camunda:Out',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    describe('camunda:inputParameter', function() {

      it('with body content', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-body.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            name: 'foo',
            value: 'BAR'
          });

          done(err);
        });
      });


      it('with nested script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            definition: {
              $type: 'camunda:Script'
            }
          });

          done(err);
        });
      });


      it('with nested list', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-list.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            name: 'var1',
            definition: {
              $type: 'camunda:List',
              items: [
                {
                  $type: 'camunda:Value',
                  value: '${1+1}'
                },
                {
                  $type: 'camunda:Value',
                  value: '${1+2}'
                },
                {
                  $type: 'camunda:Value',
                  value: '${1+3}'
                }
              ]
            }
          });

          done(err);
        });
      });


      it('with nested map', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-map.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            definition: {
              $type: 'camunda:Map',
              entries: [
                {
                  $type: 'camunda:Entry',
                  key: 'a',
                  value: '${1+1}'
                },
                {
                  $type: 'camunda:Entry',
                  key: 'b',
                  value: '${1+2}'
                },
                {
                  $type: 'camunda:Entry',
                  key: 'c',
                  value: '${1+3}'
                }
              ]
            }
          });

          done(err);
        });
      });

    });


    describe('camunda:outputParameter', function() {

      it('with mixed contents', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-outputParameter-mixed.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:OutputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:OutputParameter',
            name: 'var1',
            definition: {
              $type: 'camunda:List',
              items: [
                {
                  $type: 'camunda:Value',
                  value: 'constantStringValue'
                },
                {
                  $type: 'camunda:Value',
                  value: '${ \'elValue\' }'
                },
                {
                  $type: 'camunda:Script',
                  scriptFormat: 'Groovy',
                  value: 'return "scriptValue";'
                }
              ]
            }
          });

          done(err);
        });
      });

    });


    describe('camunda:FormSupported with camunda:formKey and camunda:formHandlerClass', function() {

      it('on UserTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/userTask-camunda-formSupported.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:UserTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:UserTask',
            formHandlerClass: 'my.company.FormHandler',
            formKey: 'form.html'
          });

          done(err);
        });
      });


      it('on StartEvent', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/userTask-camunda-formSupported.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:UserTask', function(err, startEvent) {

          // then
          expect(startEvent).to.jsonEqual({
            $type: 'bpmn:UserTask',
            formHandlerClass: 'my.company.FormHandler',
            formKey: 'form.html'
          });

          done(err);
        });
      });

    });


    describe('camunda:TemplateSupported with camunda:modelerTemplate', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-camunda-modelerTemplate.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Process',
            modelerTemplate: 'foo'
          });

          done(err);
        });
      });

      it('on Task', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/task-camunda-modelerTemplate.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Task', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo'
          });

          done(err);
        });
      });

      it('on StartEvent', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/startEvent-camunda-modelerTemplate.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:StartEvent', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            modelerTemplate: 'bar'
          });

          done(err);
        });
      });

    });


    describe('camunda:initiator', function() {

      it('on StartEvent', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/startEvent-camunda-initiator.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:StartEvent', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            initiator: 'kermit'
          });

          done(err);
        });
      });

    });

    it('bpmn:CallActivity', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/callActivity.part.bpmn');

      // when
      moddle.fromXML(xml, 'bpmn:CallActivity', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'bpmn:CallActivity',
          calledElementBinding: 'version',
          calledElementVersion: '1',
          calledElementVersionTag: 'version1',
          calledElementTenantId: 'tenant1',
          caseRef: 'oneTaskCase',
          caseBinding: 'version',
          caseVersion: '2',
          caseTenantId: 'tenant1',
          variableMappingClass: 'org.camunda.bpm.test.Test',
          variableMappingDelegateExpression: '${test}'
        });

        done(err);
      });

    });

    describe('camunda:taskPriority', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-camunda-taskPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type : 'bpmn:Process',
            taskPriority : '100'
          });

          done(err);
        });
      });


      it('on ServiceTaskLike Element', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-camunda-taskPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type : 'bpmn:ServiceTask',
            taskPriority : '100'
          });

          done(err);
        });
      });
    });


    describe('camunda:jobPriority', function() {

      it('on Process', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process-camunda-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:Process',
            jobPriority: '100'
          });

          done(err);
        });
      });


      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-camunda-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            jobPriority: '100'
          });

          done(err);
        });
      });


      it('on Gateway', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/gateway-camunda-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ExclusiveGateway', function(err, gateway) {

          // then
          expect(gateway).to.jsonEqual({
            $type: 'bpmn:ExclusiveGateway',
            jobPriority: '${ some - expression }'
          });

          done(err);
        });
      });


      it('on Event', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/event-camunda-jobPriority.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:IntermediateCatchEvent', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:IntermediateCatchEvent',
            jobPriority: '100'
          });

          done(err);
        });
      });

    });


    describe('bpmn:Process', function() {

      it('extended with camunda:candidateStarterUsers, camunda:candidateStarterGroups, camunda:versionTag', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/process.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:Process',
            candidateStarterUsers: 'userInGroup2',
            candidateStarterGroups: 'group1, group2, group3',
            versionTag: '1.0.0'
          });

          done(err);
        });
      });

    });


    describe('bpmn:ScriptTask', function() {

      it('extended with camunda:resource, camunda:resultVariable', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/scriptTask.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ScriptTask', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ScriptTask',
            scriptFormat: 'python',
            resource: 'some-file.py',
            resultVariable: 'result'
          });

          done(err);
        });
      });

    });


    it('camunda:formData', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-formData.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:FormData', function(err, formData) {

        // then
        expect(formData).to.jsonEqual({
          $type: 'camunda:FormData',
          fields: [
            {
              $type: 'camunda:FormField',
              id: 'stringField',
              label: 'String Field',
              type: 'string',
              defaultValue: 'someString',
              properties: {
                $type: 'camunda:Properties',
                values: [
                  {
                    $type: 'camunda:Property',
                    id: 'p1',
                    value: 'property1'
                  },
                  {
                    $type: 'camunda:Property',
                    id: 'p2',
                    value: 'property2'
                  }
                ]
              },
              validation: {
                $type: 'camunda:Validation',
                constraints: [
                  {
                    $type: 'camunda:Constraint',
                    name: 'readonly'
                  },
                  {
                    $type: 'camunda:Constraint',
                    name: 'minlength',
                    config: '5'
                  }
                ]
              },
              values: [
                {
                  $type: 'camunda:Value',
                  id: 'a',
                  name: 'A'
                },
                {
                  $type: 'camunda:Value',
                  id: 'b',
                  name: 'B'
                }
              ]
            }
          ]
        });

        done(err);
      });

    });


    describe('camunda:formProperty', function() {

      it('attributes', function(done) {
        // given
        var xml = readFile('test/fixtures/xml/camunda-formProperty-attributes.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:FormProperty', function(err, formProperty) {

          // then
          expect(formProperty).to.jsonEqual({
            $type: 'camunda:FormProperty',
            id: 'longProperty',
            name: 'Property',
            type: 'long',
            required: 'true',
            readable: 'true',
            writable: 'true',
            variable: 'SpeakerName',
            expression: '#{address.street}',
            datePattern: 'dd-MM-yyyy hh:mm',
            default: '42'
          });

          done(err);
        });
      });


      it('with nested value', function(done) {
        // given
        var xml = readFile('test/fixtures/xml/camunda-formProperty-children.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:FormProperty', function(err, formProperty) {

          // then
          expect(formProperty).to.jsonEqual({
            $type: 'camunda:FormProperty',
            values: [
              {
                $type: 'camunda:Value',
                id: 'false',
                name: 'Yes'
              },
              {
                $type: 'camunda:Value',
                id: 'true',
                name: 'No'
              }
            ]
          });

          done(err);
        });
      });

    });

    describe('camunda:executionListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            'class': 'my.company.Listener'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            script: {
              $type: 'camunda:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });


      it('fields', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener-fields.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            'class': 'my.company.Listener',
            fields : [
              {
                $type: 'camunda:Field',
                name: 'fieldOne',
                stringValue: 'myString'
              },
              {
                $type: 'camunda:Field',
                name: 'fieldTwo',
                expression: '${myExpression}'
              }
            ]
          });

          done(err);
        });

      });

    });


    it('camunda:taskListener', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-taskListener.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:TaskListener', function(err, taskListener) {

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'camunda:TaskListener',
          event: 'create',
          class: 'org.camunda.bpm.engine.test.bpmn.usertask.UserTaskTestCreateTaskListener',
          delegateExpression: '${myTaskListener}',
          expression: '${myTaskListener.notify(task, task.eventName)}'
        });

        done(err);
      });
    });


    describe('camunda:field', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-field-attributes.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:Field', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'camunda:Field',
            name: 'html',
            expression: '<html><body>Hi!</body></html>',
            stringValue: '41 is not the answer!'
          });

          done(err);
        });
      });


      it('with nested expression and string', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-field-children.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:Field', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'camunda:Field',
            name: 'html',
            expression: '<html><body>Hi!</body></html>',
            string: '42 is the answer!'
          });

          done(err);
        });
      });

    });


    describe('camunda:Collectable', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-multiInstance.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:MultiInstanceLoopCharacteristics', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'bpmn:MultiInstanceLoopCharacteristics',
            isSequential: true,
            collection: '5',
            elementVariable: '5'
          });

          done(err);
        });
      });
    });

    describe('camunda tenant id', function() {

      it('on BusinessRuleTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/businessRuleTask.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:BusinessRuleTask', function(err, proc) {

          // then
          expect(proc).to.jsonEqual({
            $type: 'bpmn:BusinessRuleTask',
            decisionRef: 'myDecision',
            decisionRefBinding: 'version',
            decisionRefVersion: '1',
            decisionRefTenantId: 'tenant1'
          });

          done(err);
        });
      });


      it('on CallActivity', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/callActivity.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:CallActivity', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:CallActivity',
            calledElementBinding: 'version',
            calledElementVersion: '1',
            calledElementVersionTag: 'version1',
            calledElementTenantId: 'tenant1',
            caseRef: 'oneTaskCase',
            caseBinding: 'version',
            caseVersion: '2',
            caseTenantId: 'tenant1',
            variableMappingClass: 'org.camunda.bpm.test.Test',
            variableMappingDelegateExpression: '${test}'
          });

          done(err);
        });
      });
    });


    describe('camunda:errorMessageVariable', function() {

      it('on ErrorEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/errorEventDefinition-camunda-errorMessageVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ErrorEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ErrorEventDefinition',
            errorMessageVariable: 'errorMessage'
          });

          done(err);
        });

      });

    });

    describe('camunda:variableName', function() {

      it('on ConditionalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/conditionalEventDefinition-camunda-variableName.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ConditionalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ConditionalEventDefinition',
            variableName: 'myConditionVar'
          });

          done(err);
        });

      });

    });

    describe('camunda:variableEvent', function() {

      it('on ConditionalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/conditionalEventDefinition-camunda-variableEvent.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ConditionalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ConditionalEventDefinition',
            variableEvent: 'create, update'
          });

          done(err);
        });

      });

    });


  });

});

'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle = createModdle();

    function read(xml, root, opts) {
      return moddle.fromXML(xml, root, opts);
    }

    function fromFile(file, root, opts) {
      var contents = readFile('test/fixtures/xml/' + file);
      return read(contents, root, opts);
    }


    describe('camunda:historyTimeToLive', function() {

      it('on Process', async function() {

        // given
        var file = 'process-camunda-historyTimeToLive.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type : 'bpmn:Process',
          historyTimeToLive : 'foo'
        });
      });

    });


    describe('camunda:isStartableInTasklist', function() {

      it('on Process', async function() {

        // given
        var file = 'process-camunda-isStartableInTasklist.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type : 'bpmn:Process',
          isStartableInTasklist : true
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

      it('on UserTask', async function() {

        // given
        var file = 'userTask-camunda-priority.part.bpmn';

        // when
        var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

        // then
        expect(userTask).to.jsonEqual({
          $type: 'bpmn:UserTask',
          priority: '${ priority }'
        });
      });

    });


    describe('camunda:async', function() {

      it('on ServiceTask', async function() {

        // given
        var file = 'serviceTask-camunda-async.part.bpmn';

        // when
        var { rootElement: serviceTask } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(serviceTask).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          async: true
        });
      });


      it('on SignalEventDefinition', async function() {

        // given
        var file = 'signalEventDefinition-camunda-async.part.bpmn';

        // when
        var { rootElement: signalEventDefinition } = await fromFile(file, 'bpmn:SignalEventDefinition');

        // then
        expect(signalEventDefinition).to.jsonEqual({
          $type: 'bpmn:SignalEventDefinition',
          async: true
        });
      });

    });


    describe('camunda:errorEventDefinition', function() {

      it('on ServiceTask', async function() {

        // given
        var file = 'serviceTask-camunda-errorEventDefinition.part.bpmn';

        // when
        var { rootElement: serviceTask } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(serviceTask).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'camunda:ErrorEventDefinition',
                id: 'Id_1',
                expression: '${true}'
              },
            ],
          },
        }
        );
      });

    });


    describe('camunda:errorCodeVariable', function() {

      it('on ErrorEventDefinition', async function() {

        // given
        var file = 'errorEventDefinition-camunda-errorCodeVariable.part.bpmn';

        // when
        var { rootElement: errorEventDefinition } = await fromFile(file, 'bpmn:ErrorEventDefinition');

        // then
        expect(errorEventDefinition).to.jsonEqual({
          $type: 'bpmn:ErrorEventDefinition',
          errorCodeVariable: 'errorCode'
        });
      });

    });


    describe('camunda:escalationCodeVariable', function() {

      it('on EscalationEventDefinition', async function() {

        // given
        var file = 'escalationEventDefinition-camunda-escalationCodeVariable.part.bpmn';

        // when
        var { rootElement: escalationEventDefinition } = await fromFile(file, 'bpmn:EscalationEventDefinition');

        // then
        expect(escalationEventDefinition).to.jsonEqual({
          $type: 'bpmn:EscalationEventDefinition',
          escalationCodeVariable: 'escalationCode'
        });
      });

    });


    describe('camunda:errorMessage', function() {

      it('on Error', async function() {

        // given
        var file = 'camunda-errorMessage.part.bpmn';

        // when
        var { rootElement: error } = await fromFile(file, 'bpmn:Error');

        // then
        expect(error).to.jsonEqual({
          $type: 'bpmn:Error',
          errorMessage: 'errorMessage'
        });
      });

    });


    it('camunda:script', async function() {

      // given
      var file = 'camunda-script.part.bpmn';

      // when
      var { rootElement: script } = await fromFile(file, 'camunda:Script');

      // then
      expect(script).to.jsonEqual({
        $type: 'camunda:Script',
        scriptFormat: 'groovy',
        resource: 'null',
        value: 'foo = bar;'
      });
    });


    it('camunda:connector', async function() {

      // given
      var file = 'camunda-connector.part.bpmn';

      // when
      var { rootElement: connector } = await fromFile(file, 'camunda:Connector');

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
    });


    it('camunda:properties', async function() {

      // given
      var file = 'camunda-properties.part.bpmn';

      // when
      var { rootElement: properties } = await fromFile(file, 'camunda:Properties');

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
    });


    describe('camunda:diagramRelationId', function() {

      it('on Definitions', async function() {

        // given
        var file = 'definitions-diagramRelationId.part.bpmn';

        // when
        var { rootElement: definitions } = await fromFile(file, 'bpmn:Definitions');

        // then
        expect(definitions).to.jsonEqual({
          $type: 'bpmn:Definitions',
          diagramRelationId: 'foo'
        });
      });

    });


    it('camunda:potentialStarter', async function() {

      // given
      var file = 'camunda-potentialStarter.part.bpmn';

      // when
      var { rootElement: starter } = await fromFile(file, 'camunda:PotentialStarter');

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
    });


    describe('camunda:resource', function() {

      it('on FormalExpression', async function() {

        // given
        var file = 'formalExpression-resource.part.bpmn';

        // when
        var { rootElement: expression } = await fromFile(file, 'bpmn:FormalExpression');

        // then
        expect(expression).to.jsonEqual({
          $type: 'bpmn:FormalExpression',
          resource: 'deployment://some-file'
        });
      });

    });


    it('camunda:in', async function() {

      // given
      var file = 'camunda-in.part.bpmn';

      // when
      var { rootElement: binding } = await fromFile(file, 'camunda:In');

      // then
      expect(binding).to.jsonEqual({
        $type: 'camunda:In',
        sourceExpression: 'fooExp',
        source: 'foo',
        target: 'bar',
        variables: 'all',
        local: true
      });
    });


    it('camunda:out', async function() {

      // given
      var file = 'camunda-out.part.bpmn';

      // when
      var { rootElement: binding } = await fromFile(file, 'camunda:Out');

      // then
      expect(binding).to.jsonEqual({
        $type: 'camunda:Out',
        sourceExpression: 'fooExp',
        source: 'foo',
        target: 'bar',
        variables: 'all',
        local: true
      });
    });


    describe('camunda:inputParameter', function() {

      it('with body content', async function() {

        // given
        var file = 'camunda-inputParameter-body.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'camunda:InputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'camunda:InputParameter',
          name: 'foo',
          value: 'BAR'
        });
      });


      it('with nested script', async function() {

        // given
        var file = 'camunda-inputParameter-script.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'camunda:InputParameter');

        // then
        expect(parameter).to.jsonEqual({
          $type: 'camunda:InputParameter',
          definition: {
            $type: 'camunda:Script'
          }
        });
      });


      it('with nested list', async function() {

        // given
        var file = 'camunda-inputParameter-list.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'camunda:InputParameter');

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
      });


      it('with nested map', async function() {

        // given
        var file = 'camunda-inputParameter-map.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'camunda:InputParameter');

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
      });

    });


    describe('camunda:outputParameter', function() {

      it('with mixed contents', async function() {

        // given
        var file = 'camunda-outputParameter-mixed.part.bpmn';

        // when
        var { rootElement: parameter } = await fromFile(file, 'camunda:OutputParameter');

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
      });

    });


    describe('camunda:FormSupported with camunda:formKey and camunda:formHandlerClass', function() {

      it('on UserTask', async function() {

        // given
        var file = 'userTask-camunda-formSupported.part.bpmn';

        // when
        var { rootElement: userTask } = await fromFile(file, 'bpmn:UserTask');

        // then
        expect(userTask).to.jsonEqual({
          $type: 'bpmn:UserTask',
          formHandlerClass: 'my.company.FormHandler',
          formKey: 'form.html'
        });
      });


      it('on StartEvent', async function() {

        // given
        var file = 'startEvent-camunda-formSupported.part.bpmn';

        // when
        var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

        // then
        expect(startEvent).to.jsonEqual({
          $type: 'bpmn:StartEvent',
          formHandlerClass: 'my.company.FormHandler',
          formKey: 'form.html'
        });
      });

    });


    describe('camunda:TemplateSupported', function() {

      describe('camunda:modelerTemplate', function() {

        it('on Process', async function() {

          // given
          var file = 'process-camunda-modelerTemplate.part.bpmn';

          // when
          var { rootElement: process } = await fromFile(file, 'bpmn:Process');

          // then
          expect(process).to.jsonEqual({
            $type: 'bpmn:Process',
            modelerTemplate: 'foo'
          });
        });


        it('on Task', async function() {

          // given
          var file = 'task-camunda-modelerTemplate.part.bpmn';

          // when
          var { rootElement: task } = await fromFile(file, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo'
          });
        });


        it('on StartEvent', async function() {

          // given
          var file = 'startEvent-camunda-modelerTemplate.part.bpmn';

          // when
          var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

          // then
          expect(startEvent).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            modelerTemplate: 'bar'
          });
        });

      });


      describe('camunda:modelerTemplateVersion', function() {

        it('on Process', async function() {

          // given
          var file = 'process-camunda-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: process } = await fromFile(file, 'bpmn:Process');

          // then
          expect(process).to.jsonEqual({
            $type: 'bpmn:Process',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1
          });
        });


        it('on Task', async function() {

          // given
          var file = 'task-camunda-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: task } = await fromFile(file, 'bpmn:Task');

          // then
          expect(task).to.jsonEqual({
            $type: 'bpmn:Task',
            modelerTemplate: 'foo',
            modelerTemplateVersion: 1
          });
        });


        it('on StartEvent', async function() {

          // given
          var file = 'startEvent-camunda-modelerTemplateVersion.part.bpmn';

          // when
          var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

          // then
          expect(startEvent).to.jsonEqual({
            $type: 'bpmn:StartEvent',
            modelerTemplate: 'bar',
            modelerTemplateVersion: 1
          });
        });

      });

    });


    describe('camunda:initiator', function() {

      it('on StartEvent', async function() {

        // given
        var file = 'startEvent-camunda-initiator.part.bpmn';

        // when
        var { rootElement: startEvent } = await fromFile(file, 'bpmn:StartEvent');

        // then
        expect(startEvent).to.jsonEqual({
          $type: 'bpmn:StartEvent',
          initiator: 'kermit'
        });
      });

    });


    it('bpmn:CallActivity', async function() {

      // given
      var file = 'callActivity.part.bpmn';

      // when
      var { rootElement: callActivity } = await fromFile(file, 'bpmn:CallActivity');

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
    });


    describe('camunda:taskPriority', function() {

      it('on Process', async function() {

        // given
        var file = 'process-camunda-taskPriority.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type : 'bpmn:Process',
          taskPriority : '100'
        });
      });


      it('on ServiceTaskLike Element', async function() {

        // given
        var file = 'serviceTask-camunda-taskPriority.part.bpmn';

        // when
        var { rootElement: task } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(task).to.jsonEqual({
          $type : 'bpmn:ServiceTask',
          taskPriority : '100'
        });
      });

    });


    describe('camunda:jobPriority', function() {

      it('on Process', async function() {

        // given
        var file = 'process-camunda-jobPriority.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type: 'bpmn:Process',
          jobPriority: '100'
        });
      });


      it('on ServiceTask', async function() {

        // given
        var file = 'serviceTask-camunda-jobPriority.part.bpmn';

        // when
        var { rootElement: serviceTask } = await fromFile(file, 'bpmn:ServiceTask');

        // then
        expect(serviceTask).to.jsonEqual({
          $type: 'bpmn:ServiceTask',
          jobPriority: '100'
        });
      });


      it('on Gateway', async function() {

        // given
        var file = 'gateway-camunda-jobPriority.part.bpmn';

        // when
        var { rootElement: gateway } = await fromFile(file, 'bpmn:ExclusiveGateway');

        // then
        expect(gateway).to.jsonEqual({
          $type: 'bpmn:ExclusiveGateway',
          jobPriority: '${ some - expression }'
        });
      });


      it('on Event', async function() {

        // given
        var file = 'event-camunda-jobPriority.part.bpmn';

        // when
        var { rootElement: catchEvent } = await fromFile(file, 'bpmn:IntermediateCatchEvent');

        // then
        expect(catchEvent).to.jsonEqual({
          $type: 'bpmn:IntermediateCatchEvent',
          jobPriority: '100'
        });
      });

    });


    describe('bpmn:Process', function() {

      it('extended with camunda:candidateStarterUsers, camunda:candidateStarterGroups, camunda:versionTag', async function() {

        // given
        var file = 'process.part.bpmn';

        // when
        var { rootElement: process } = await fromFile(file, 'bpmn:Process');

        // then
        expect(process).to.jsonEqual({
          $type: 'bpmn:Process',
          candidateStarterUsers: 'userInGroup2',
          candidateStarterGroups: 'group1, group2, group3',
          versionTag: '1.0.0'
        });
      });

    });


    describe('bpmn:ScriptTask', function() {

      it('extended with camunda:resource, camunda:resultVariable', async function() {

        // given
        var file = 'scriptTask.part.bpmn';

        // when
        var { rootElement: scriptTask } = await fromFile(file, 'bpmn:ScriptTask');

        // then
        expect(scriptTask).to.jsonEqual({
          $type: 'bpmn:ScriptTask',
          scriptFormat: 'python',
          resource: 'some-file.py',
          resultVariable: 'result'
        });
      });

    });


    it('camunda:formData', async function() {

      // given
      var file = 'camunda-formData.part.bpmn';

      // when
      var { rootElement: formData } = await fromFile(file, 'camunda:FormData');

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
    });


    describe('camunda:formProperty', function() {

      it('attributes', async function() {

        // given
        var file = 'camunda-formProperty-attributes.part.bpmn';

        // when
        var { rootElement: formProperty } = await fromFile(file, 'camunda:FormProperty');

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
      });


      it('with nested value', async function() {

        // given
        var file = 'camunda-formProperty-children.part.bpmn';

        // when
        var { rootElement: formProperty } = await fromFile(file, 'camunda:FormProperty');

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
      });

    });


    describe('camunda:executionListener', function() {

      it('attributes', async function() {

        // given
        var file = 'camunda-executionListener.part.bpmn';

        // when
        var { rootElement: executionListener } = await fromFile(file, 'camunda:ExecutionListener');

        // then
        expect(executionListener).to.jsonEqual({
          $type: 'camunda:ExecutionListener',
          event: 'start',
          'class': 'my.company.Listener'
        });
      });


      it('script', async function() {

        // given
        var file = 'camunda-executionListener-script.part.bpmn';

        // when
        var { rootElement: executionListener } = await fromFile(file, 'camunda:ExecutionListener');

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
      });


      it('fields', async function() {

        // given
        var file = 'camunda-executionListener-fields.part.bpmn';

        // when
        var { rootElement: executionListener } = await fromFile(file, 'camunda:ExecutionListener');

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
      });

    });


    describe('camunda:taskListener', function() {

      it('create event', async function() {

        // given
        var file = 'camunda-taskListener.part.bpmn';

        // when
        var { rootElement: taskListener } = await fromFile(file, 'camunda:TaskListener');

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'camunda:TaskListener',
          event: 'create',
          class: 'org.camunda.bpm.engine.test.bpmn.usertask.UserTaskTestCreateTaskListener',
          delegateExpression: '${myTaskListener}',
          expression: '${myTaskListener.notify(task, task.eventName)}'
        });
      });


      it('timeout event', async function() {

        // given
        var file = 'camunda-timeout-taskListener.part.bpmn';

        // when
        var { rootElement: taskListener } = await fromFile(file, 'camunda:TaskListener');

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'camunda:TaskListener',
          event: 'timeout',
          id: 'timeout-friendly',
          eventDefinitions: [
            {
              $type: 'bpmn:TimerEventDefinition',
              timeDuration: {
                $type: 'bpmn:FormalExpression',
                body: 'PT1H'
              }
            }
          ]
        });
      });

    });


    describe('camunda:field', function() {

      it('attributes', async function() {

        // given
        var file = 'camunda-field-attributes.part.bpmn';

        // when
        var { rootElement: field } = await fromFile(file, 'camunda:Field');

        // then
        expect(field).to.jsonEqual({
          $type: 'camunda:Field',
          name: 'html',
          expression: '<html><body>Hi!</body></html>',
          stringValue: '41 is not the answer!'
        });
      });


      it('with nested expression and string', async function() {

        // given
        var file = 'camunda-field-children.part.bpmn';

        // when
        var { rootElement: field } = await fromFile(file, 'camunda:Field');

        // then
        expect(field).to.jsonEqual({
          $type: 'camunda:Field',
          name: 'html',
          expression: '<html><body>Hi!</body></html>',
          string: '42 is the answer!'
        });
      });

    });


    describe('camunda:Collectable', function() {

      it('attributes', async function() {

        // given
        var file = 'camunda-multiInstance.part.bpmn';

        // when
        var { rootElement: field } = await fromFile(file, 'bpmn:MultiInstanceLoopCharacteristics');

        // then
        expect(field).to.jsonEqual({
          $type: 'bpmn:MultiInstanceLoopCharacteristics',
          isSequential: true,
          collection: '5',
          elementVariable: '5'
        });
      });

    });


    describe('camunda tenant id', function() {

      it('on BusinessRuleTask', async function() {

        // given
        var file = 'businessRuleTask.part.bpmn';

        // when
        var { rootElement: businessRuleTask } = await fromFile(file, 'bpmn:BusinessRuleTask');

        // then
        expect(businessRuleTask).to.jsonEqual({
          $type: 'bpmn:BusinessRuleTask',
          decisionRef: 'myDecision',
          decisionRefBinding: 'version',
          decisionRefVersion: '1',
          decisionRefTenantId: 'tenant1'
        });
      });


      it('on CallActivity', async function() {

        // given
        var file = 'callActivity.part.bpmn';

        // when
        var { rootElement: callActivity } = await fromFile(file, 'bpmn:CallActivity');

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
      });

    });


    describe('camunda:errorMessageVariable', function() {

      it('on ErrorEventDefinition', async function() {

        // given
        var file = 'errorEventDefinition-camunda-errorMessageVariable.part.bpmn';

        // when
        var { rootElement: errorEventDefinition } = await fromFile(file, 'bpmn:ErrorEventDefinition');

        // then
        expect(errorEventDefinition).to.jsonEqual({
          $type: 'bpmn:ErrorEventDefinition',
          errorMessageVariable: 'errorMessage'
        });
      });

    });


    describe('camunda:variableName', function() {

      it('on ConditionalEventDefinition', async function() {

        // given
        var file = 'conditionalEventDefinition-camunda-variableName.part.bpmn';

        // when
        var { rootElement: conditionalEventDefinition } = await fromFile(file, 'bpmn:ConditionalEventDefinition');

        // then
        expect(conditionalEventDefinition).to.jsonEqual({
          $type: 'bpmn:ConditionalEventDefinition',
          variableName: 'myConditionVar'
        });
      });

    });


    describe('camunda:variableEvents', function() {

      it('on ConditionalEventDefinition', async function() {

        // given
        var file = 'conditionalEventDefinition-camunda-variableEvents.part.bpmn';

        // when
        var { rootElement: conditionalEventDefinition } = await fromFile(file, 'bpmn:ConditionalEventDefinition');

        // then
        expect(conditionalEventDefinition).to.jsonEqual({
          $type: 'bpmn:ConditionalEventDefinition',
          variableEvents: 'create, update'
        });
      });

    });

  });

});

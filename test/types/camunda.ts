/**
 * Type-level harness for the generated Camunda moddle types.
 *
 * Compiled with `tsc --noEmit` (see the `test:types` script) — nothing runs at
 * runtime. Each assertion pins down a part of the contract consumers rely on:
 * how a Camunda extension shows up on a real moddle element.
 */

import { expectType } from 'ts-expect';

import type { ModdleElement } from 'moddle';
import type { BpmnServiceTask } from 'bpmn-moddle/types';

import type {
  CamundaModdleTypeMap,
  CamundaServiceTaskLike,
  CamundaConnector,
  CamundaExecutionListener,
  CamundaError,
  CamundaInputOutput,
  CamundaInputParameter
} from 'camunda-bpmn-moddle/types';


// a mixin composes onto its base: a Camunda service task is a `bpmn:ServiceTask`
// with the Camunda extension properties grafted on
type CamundaServiceTask = ModdleElement<BpmnServiceTask & CamundaServiceTaskLike>;

declare const serviceTask: CamundaServiceTask;
expectType<string | undefined>(serviceTask.implementation); // from bpmn
expectType<string | undefined>(serviceTask.expression);     // from camunda


// mixin types graft onto other types from the side — they are no element's own type
// @ts-expect-error `camunda:ServiceTaskLike` is a mixin, not an element
type NoServiceTaskLike = CamundaModdleTypeMap['camunda:ServiceTaskLike'];
// @ts-expect-error `camunda:Error` grafts onto `bpmn:Error`, not an element
type NoError = CamundaModdleTypeMap['camunda:Error'];


// concrete extension elements expose their modeled properties
expectType<CamundaConnector>({ connectorId: 'http-connector' });
expectType<CamundaExecutionListener>({ event: 'start', class: 'com.example.Listener' });


// a namespaced property name stays a valid, typed key
expectType<CamundaError>({ 'camunda:errorMessage': 'boom' });


// nested children are typed as moddle elements of the child type
declare const inputOutput: ModdleElement<CamundaInputOutput>;
const firstInput = inputOutput.inputParameters?.[0];
expectType<ModdleElement<CamundaInputParameter> | undefined>(firstInput);
expectType<string | undefined>(firstInput?.name);


export type { CamundaServiceTask, NoServiceTaskLike, NoError };

# Changelog

All notable changes to [camunda-bpmn-moddle](https://github.com/camunda/camunda-bpmn-moddle) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 4.5.0

* `FIX`: add `modelerTemplateVersion` property ([#60](https://github.com/camunda/camunda-bpmn-moddle/pull/60))

## 4.4.1

* `FIX`: rename `variableEvent` to `variableEvents` ([`cd4a417`](https://github.com/camunda/camunda-bpmn-moddle/commit/cd4a417c1ee7831646f896d2360854aee7ee1ad3))

## 4.4.0

* `FEAT`: copy [`camunda:in`](https://docs.camunda.org/manual/7.12/reference/bpmn20/custom-extensions/extension-elements/#in) on signal throw events ([#54](https://github.com/camunda/camunda-bpmn-moddle/pull/54))

## 4.3.0

* `FEAT`: add `id` and `eventDefinitions` to task listener schema ([`9668525f`](https://github.com/camunda/camunda-bpmn-moddle/commit/9668525f217df6938312e84bde0f022115ea5935))

## 4.2.0

* `FEAT`: add `camunda:diagramRelationId` to schema ([#49](https://github.com/camunda/camunda-bpmn-moddle/issues/49))

## 4.1.2

* `FIX`: do not copy `camunda:InputOutput` on gateways
* `FIX`: copy `camunda:FailedJobRetryTimeCycle` consistently for all `camunda:AsyncCapable` elements

## 4.1.1

* `FIX`: allow [`camunda:failedJobRetryTimeCycle`](https://docs.camunda.org/manual/7.11/reference/bpmn20/custom-extensions/extension-elements/#failedjobretrytimecycle) in `bpmn:SubProcess`
* `FIX`: allow [`camunda:executionListener`](https://docs.camunda.org/manual/7.11/reference/bpmn20/custom-extensions/extension-elements/#executionlistener) in `bpmn:Process`

## 4.1.0

* `FEAT`: add `camunda:errorMessage` to schema ([`d47da`](https://github.com/camunda/camunda-bpmn-moddle/commit/d47da3a8e90b90994fd397c3ddb6572ce6dcbc1c))

## 4.0.1

* `DOCS`: update bpmn-js integration docs

## 4.0.0

* `CHORE`: update moddle copy mechanism for compatibility with `bpmn-js@5`
* `CHORE`: use Camunda logical types in `allowedIn` mappings
* `FIX`: make extension work

### Breaking Changes

* Requires `bpmn-js@5+` for proper copying of moddle attributes

## 3.2.0

* `FEAT`: add `camunda:calledElementVersionTag` to schema ([#43](https://github.com/camunda/camunda-bpmn-moddle/issues/43))

## 3.1.1

* `FIX`: correct `camunda:isStartableInTasklist` default value ([#41](https://github.com/camunda/camunda-bpmn-moddle/issues/41))

## 3.1.0

* `FEAT`: support `camunda:isStartableInTasklist`

## ...

Check `git log` for earlier history.

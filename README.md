angular-ui-history
==================
Simple history display component for Angular.

[Demo](https://momsfriendlydevco.github.io/angular-ui-history).


Installation
------------
1. Grab the NPM

```shell
npm install --save @momsfriendlydevco/angular-ui-history
```


2. Install the required script + CSS somewhere in your build chain or include it in a HTML header:

```html
<script src="/libs/angular-ui-history/dist/angular-ui-history.min.js"/>
<link href="/libs/angular-ui-history/dist/angular-ui-history.min.css" rel="stylesheet" type="text/css"/>
```


3. Include the router in your main `angular.module()` call:

```javascript
var app = angular.module('app', ['angular-ui-history'])
```


4. Use somewhere in your template:

```html
FIXME: <ui-history></ui-history>
```


A demo is also available. To use this [follow the instructions in the demo directory](./demo/README.md).


API
===

Directive Settings
------------------

| Setting     | Type                   | Default     | Description                                                                                                     |
|-------------|------------------------|-------------|-----------------------------------------------------------------------------------------------------------------|
| `allowPost` | `boolean`              | `false`     | Whether to allow posting of new comments                                                                        |
| `queryUrl`  | `string` or `function` | `undefined` | Where to fetch the existing history from. If this is a function it is expected to provide the GET string to use |
| `catcher`   | `function`             | `undefined` | How to catch error messages from any of the interfaces                                                          |

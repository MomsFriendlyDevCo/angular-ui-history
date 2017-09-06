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

This module also requires several third party dependencies to be exposed:

```html
<script src="/libs/angular-gravatar/build/angular-gravatar.min.js"></script>
<script src="/libs/angular-relative-date/dist/angular-relative-date.min.js"></script>
<script src="/libs/@momsfriendlydevco/angular-bs-tooltip/dist/angular-bs-tooltip.min.js"></script>
<script src="/libs/quill/dist/quill.min.js"></script>
<script src="/libs/ng-quill/dist/ng-quill.min.js"></script>
<link rel="stylesheet" href="/libs/quill/dist/quill.snow.css">
```


3. Include the router in your main `angular.module()` call:

```javascript
var app = angular.module('app', ['angular-ui-history'])
```


4. Use somewhere in your template:

```html
<ui-history query-url="'/api/history'" allow-post="true" allow-upload="true"></ui-history>
```


A demo is also available. To use this [follow the instructions in the demo directory](./demo/README.md).


API
===
This package profiles the following directives:

* [uiHistoryProvider (service)](./docs/uiHistoryProvider.md)
* [ui-history (directive)](./docs/history.md)
* [ui-history-files (directive)](./docs/history-files.md)

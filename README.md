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
FIXME: <ui-history></ui-history>
```


A demo is also available. To use this [follow the instructions in the demo directory](./demo/README.md).


API
===

History Items
-------------
Each item within the history collection is an object with the following combinations:

### All types

These properties are common for all history item types.

| Property     | Type                 | Description                                                                                                       |
|--------------|----------------------|-------------------------------------------------------------------------------------------------------------------|
| `type`       | `string`             | The type of the history item                                                                                      |
| `date`       | `string` or `Date`   | The JavaScript Date object or a string that can be parsed into one representing when the history item was created |


### type=user.change

Used to display that a user has changed a field from one value to another.
See also `system.change` if the change is internal.

| Property     | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `user.email` | `string` | The email address of the user       |
| `user.name`  | `string` | The human-friendly name of the user |
| `field`      | `string` | The name of the field that changed  |
| `from`       | `string` | The previous value                  |
| `to`         | `string` | The new value                       |


### type=user.comment

Used to comment that a user has made.

| Property     | Type     | Description                                   |
|--------------|----------|-----------------------------------------------|
| `user.email` | `string` | The email address of the user                 |
| `user.name`  | `string` | The human-friendly name of the user           |
| `user.url`   | `string` | Link for the user avatar                      |
| `body`       | `string` | The HTML contents of the item to render       |
| `title`      | `string` | Optional title header to display for the item |


### type=system.change

Used to display that the system has changed a field from one value to another.
See also `user.change` if the change was performed by a user.

| Property     | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `field`      | `string` | The name of the field that changed  |
| `from`       | `string` | The previous value                  |
| `to`         | `string` | The new value                       |


Directive Settings
------------------

| Setting     | Type                   | Default     | Description                                                                                                     |
|-------------|------------------------|-------------|-----------------------------------------------------------------------------------------------------------------|
| `allowPost` | `boolean`              | `false`     | Whether to allow posting of new comments                                                                        |
| `queryUrl`  | `string` or `function` | `undefined` | Where to fetch the existing history from. If this is a function it is expected to provide the GET string to use |
| `catcher`   | `function`             | `undefined` | How to catch error messages from any of the interfaces                                                          |

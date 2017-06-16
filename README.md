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
| `fields`     | `object` | Object with multiple changes (each entry should have a `from` + `to` key + value |


### type=user.comment

Used to comment that a user has made.

| Property     | Type     | Description                                   |
|--------------|----------|-----------------------------------------------|
| `user.email` | `string` | The email address of the user                 |
| `user.name`  | `string` | The human-friendly name of the user           |
| `user.url`   | `string` | Link for the user avatar                      |
| `body`       | `string` | The HTML contents of the item to render       |
| `title`      | `string` | Optional title header to display for the item |


### type=user.upload

User to signal a user has uploaded a file.

| Property     | Type     | Description                                   |
|--------------|----------|-----------------------------------------------|
| `filename`   | `string` | The filename of the file uploaded             |
| `files`      | `array`  | Optional array of invidual files to display (each must have `filename` with optional other fields) |
| `icon`       | `string` | Icon class to display for the file            |
| `size`       | `string` | Optional file size to show to the user        |
| `url`        | `string` | Optional URL link to the file contents        |


### type=user.status

Used to pin a generic one-line comment next to a user.

| Property     | Type     | Description                                   |
|--------------|----------|-----------------------------------------------|
| `title`      | `string` | Title header to display for the item          |


### type=system.change

Used to display that the system has changed a field from one value to another.
See also `user.change` if the change was performed by a user.

| Property     | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `field`      | `string` | The name of the field that changed  |
| `from`       | `string` | The previous value                  |
| `to`         | `string` | The new value                       |
| `fields`     | `object` | Object with multiple changes (each entry should have a `from` + `to` key + value |


### type=system.status

Used to pin a generic one-line comment.

| Property     | Type     | Description                                   |
|--------------|----------|-----------------------------------------------|
| `title`      | `string` | Title header to display for the item          |


Directive Settings
------------------

| Setting       | Type                   | Default         | Description                                                                                                     |
|---------------|------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------|
| `allowPost`   | `boolean`              | `false`         | Whether to allow posting of new comments                                                                        |
| `allowUpload` | `boolean`              | `false`         | Whether to allow file attachments in the comment feed                                                           |
| `buttons`     | `array`                | Upload button   | Collection of buttons to display in the toolbar. Each must have a `title`, `icon` and an optional `action` property. See notes below on how to react to events |
| `display`     | `string`               | `'oldestFirst'` | How to display posts. Can be either `'recentFirst'` or `'oldestFirst'`                                          |
| `queryUrl`    | `string` or `function` | `undefined`     | Where to fetch the existing history from. If this is a function it is expected to provide the GET string to use |
| `postUrl`     | `string` or `function` | `undefined`     | Where to post the history items created if `allowPost == true`. This end-point gets a single `req.body.body` value which is the HTML output of the WYSIWYG post. If undefined, `queryUrl` will be used |
| `onError`     | `function`             | `undefined`     | How to catch error messages from any of the interfaces. Called as `({error})`                                   |
| `onUpload`    | `function`             | `undefined`     | Event fired when a file upload is successful. Called as `({serverResponse})`                                    |


**Notes:**

* To react for a button event set up an event listener against the action. For example if you have the button config `buttons="[{title: 'Foo', icon: 'foo-icon', action: 'foo'}]"` use `$scope.$on('angular-ui-history.button.foo')` to listen for its action
* Listen to all button actions by listening to the event `$scope.$on('angular-ui-history.button')`

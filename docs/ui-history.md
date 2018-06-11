ui-history
==========
History display and posting directive for [angular-ui-history](https://github.com/MomsFriendlyDevCo/angular-ui-history).

```html
<ui-history
	display="'recentFirst'"
	query-url="'history.json'"
	post-url="'history.json'"
	allow-post="true"
	allow-upload="true"
	buttons="[
		{title: 'Custom Button', icon: 'fa fa-flag', action: 'custom'},
		{title: 'File list', icon: 'fa fa-folder-o', action: 'uploadList'},
		{title: 'Upload files...', icon: 'fa fa-file-o', action: 'upload'},
	]"
	templates="[
		{title: 'Call back', icon: 'fa fa-fw fa-phone', content: 'I will return your call shortly'},
		{title: 'PICNIC', icon: 'fa fa-fw fa-user', content: 'Problem in chair not in computer'},
	]"
	on-query="filterQuery(posts)"
></ui-history>
```

Directive Settings
------------------

| Setting           | Type                   | Default         | Description                                                                                                     |
|-------------------|------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------|
| `allowPost`       | `boolean`              | `false`         | Whether to allow posting of new comments                                                                        |
| `allowUpload`     | `boolean`              | `false`         | Whether to allow file attachments in the comment feed                                                           |
| `allowUploadList` | `boolean`              | `true`          | Whether to show a button which displays the list of uploaded files                                              |
| `buttons`         | `array`                | Upload button   | Collection of buttons to display in the toolbar. Each must have a `title`, `icon` and an optional `action` property. See notes below on how to react to events |
| `display`         | `string`               | `'oldestFirst'` | How to display posts. Can be either `'recentFirst'` or `'oldestFirst'`                                          |
| `queryUrl`        | `string` or `function` | `undefined`     | Where to fetch the existing history from. If this is a function it is expected to provide the GET string to use |
| `queryUploadsUrl` | `string` or `function` | `undefined`     | Seperate URL to fetch files from if `allowUploadList` is enabled (Defaults to using `queryUrl` if unspecified)  |
| `postUrl`         | `string` or `function` | `undefined`     | Where to post the history items created if `allowPost == true`. This end-point gets a single `req.body.body` value which is the HTML output of the WYSIWYG post. If undefined, `queryUrl` will be used |
| `templates`       | `array`                | `undefined`     | Optional list of templates to quickly set the contents. Each item should be an object containing at least `title` and `content` with an optional `icon` |
| `onError`         | `function`             | `undefined`     | How to catch error messages from any of the interfaces. Called as `({error})`                                   |
| `onLoadingStart`  | `function`             | `undefined`     | Event to fire when a loading action begins (fetching posts, uploads etc.)                                       |
| `onLoadingStop`   | `function`             | `undefined`     | Event to fire when a loading action copletes                                                                    |
| `onQuery`         | `function`             | `undefined`     | A pre-query rendering hook after the data has been retrieved from the server. If this function returns an array its contents will be used as the post content. This can be useful as a filter / mangling service |
| `onUpload`        | `function`             | `undefined`     | Event fired when a file upload is successful. Called as `({serverResponse})`                                    |


**Notes:**

* To react for a button event set up an event listener against the action. For example if you have the button config `buttons="[{title: 'Foo', icon: 'foo-icon', action: 'foo'}]"` use `$scope.$on('angular-ui-history.button.foo')` to listen for its action
* Listen to all button actions by listening to the event `$scope.$on('angular-ui-history.button')`
* `onQuery` is best used as a service. e.g. in the template: `<ui-history on-query="$ctrl.myFilter(posts)"></ui-history>` and in the controller: `$ctrl.myFilter = data => data.filter(// ... some filter ...//)`


Events (Listenable)
-------------------

| Event                             | Arguments    | Description                                                  |
|-----------------------------------|--------------|--------------------------------------------------------------|
| `angular-ui-history.button`       | `(button)`   | Fired when the user presses any button                       |
| `angular-ui-history.button.${ID}` | `()`         | Fired when the user presses the button desginated by `${ID}` |
| `angular-ui-history.template`     | `(template)` | Fired when the user selectes a template                      |


Events (Broadcastable)
----------------------
| Event                             | Arguments    | Description                                                  |
|-----------------------------------|--------------|--------------------------------------------------------------|
| `angular-ui-history.post`         |              | Attempt to post a non-blank comment (if any)                 |


History Items
-------------
Each item within the history collection is an object with the following combinations:

### All types

These properties are common for all history item types.

| Property     | Type                 | Description                                                                                                       |
|--------------|----------------------|-------------------------------------------------------------------------------------------------------------------|
| `type`       | `string`             | The type of the history item                                                                                      |
| `date`       | `string` or `Date`   | The JavaScript Date object or a string that can be parsed into one representing when the history item was created |
| `tags`       | `array`              | An array of strings to tag each post with                                                                         |


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

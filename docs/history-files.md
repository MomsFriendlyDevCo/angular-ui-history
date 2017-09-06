ui-history-files
================
File listing component for [angular-ui-history](https://github.com/MomsFriendlyDevCo/angular-ui-history).


Directive Settings
------------------

| Setting           | Type                   | Default         | Description                                                                                                     |
|-------------------|------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------|
| `allowUpload`     | `boolean`              | `false`         | Whether to allow file uploads                                                                                   |
| `queryUrl`        | `string` or `function` | `undefined`     | Where to fetch the existing history from. If this is a function it is expected to provide the GET string to use |
| `postUrl`         | `string` or `function` | `undefined`     | Where to post new file uploads to                                                                               |
| `onError`         | `function`             | `undefined`     | How to catch error messages from any of the interfaces. Called as `({error})`                                   |
| `onLoadingStart`  | `function`             | `undefined`     | Event to fire when a loading action begins (fetching posts, uploads etc.)                                       |
| `onLoadingStop`   | `function`             | `undefined`     | Event to fire when a loading action completes                                                                   |
| `onQuery`         | `function`             | `undefined`     | A pre-query rendering hook after the data has been retrieved from the server. If this function returns an array its contents will be used as the post content. This can be useful as a filter / mangling service |
| `onUpload`        | `function`             | `undefined`     | Event fired when a file upload is successful. Called as `({serverResponse})`                                    |

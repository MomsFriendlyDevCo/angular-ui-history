uiHistoryProvider
-----------------
Angular provider for [angular-ui-history](https://github.com/MomsFriendlyDevCo/angular-ui-history).

To set univeral component defaults use the `uiHistoryProvider.defaults` object:

```javascript
app.config(function(uiHistoryProvider) {
	// Sets the default onError value
	uiHistoryProvider.defaults.onError = err => console.log('ERROR', err);
});
```

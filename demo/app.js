var app = angular.module("app", [
	'angular-ui-history'
]);

app.config(function(uiHistoryProvider) {
	// Set defaults here
	uiHistoryProvider.defaults.onError = err => console.log('ERROR', err);
});

app.controller("historyExampleCtrl", function($scope) {
	$scope.isGitHub = /\.github.io$/.test(document.location.hostname);

	$scope.filterQuery = data => data; // Example filter that returns everything. Change this to a mangling funciton if you want to restrict what gets shown

	$scope.$on('angular-ui-history.button.custom', ()=> alert('Hello!'));

	$scope.uploadStart = files => console.log('Upload started', files);
	$scope.uploadProgress = (files, progress) => console.log('Upload progress', progress, files);
	$scope.uploadEnd = files => console.log('Upload complete', files);

	$scope.getUsers = searchTerm => `/api/users?q=${searchTerm}`;
});

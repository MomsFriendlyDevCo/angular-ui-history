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
});

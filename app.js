var app = angular.module("app", [
	'angular-ui-history'
]);

app.controller("historyExampleCtrl", function($scope) {
	$scope.isGitHub = /\.github.io$/.test(document.location.hostname);
});

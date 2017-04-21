'use strict';

angular.module('angular-ui-history', ['angular-bs-tooltip', 'relativeDate', 'ui.gravatar']).component('uiHistory', {
	bindings: {
		allowPost: '<',
		queryUrl: '<',
		postUrl: '<',
		catcher: '<'
	},
	template: '\n\t\t<div class="ui-history">\n\t\t\t<div ng-repeat="post in $ctrl.posts track by post._id" ng-switch="post.type" class="ui-history-item">\n\t\t\t\t<div class="ui-history-timestamp" tooltip="{{post.date | date:\'medium\'}}">\n\t\t\t\t\t{{post.date | relativeDate}}\n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when="user.change" class="ui-history-comment">\n\t\t\t\t\t<div class="ui-history-comment-user">\n\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ui-history-comment-main">\n\t\t\t\t\t\t<div class="ui-history-comment-header">HEADER</div>\n\t\t\t\t\t\t<div class="ui-history-comment-body">\n\t\t\t\t\t\t\tChanged\n\t\t\t\t\t\t\t{{post.field}}\n\t\t\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="user.comment" class="ui-history-comment">\n\t\t\t\t\t<div class="ui-history-comment-user">\n\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ui-history-comment-main">\n\t\t\t\t\t\t<div ng-if="post.title" class="ui-history-comment-header">{{post.title}}</div>\n\t\t\t\t\t\t<div class="ui-history-comment-body">{{post.body}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="system.change" class="ui-history-change">\n\t\t\t\t\tChanged\n\t\t\t\t\t{{post.field}}\n\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-default class="ui-history-unknown">\n\t\t\t\t\tUnknown history type: [{{post.type}}]\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div ng-if="$ctrl.allowPost">\n\t\t\t\t<hr/>\n\t\t\t\t<div ng-show="$ctrl.isPosting" class="text-center">\n\t\t\t\t\t<h3><i class="fa fa-spinner fa-spin"></i> Posting...</h3>\n\t\t\t\t</div>\n\t\t\t\t<div ng-show="!$ctrl.isPosting">\n\t\t\t\t\t<form ng-submit="$ctrl.makePost()" class="form-horizontal">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t\t\t<textarea ng-model="$ctrl.newPost.body" class="form-control" rows="10"></textarea>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="col-sm-12 text-right">\n\t\t\t\t\t\t\t\t<button type="submit" class="btn btn-success">\n\t\t\t\t\t\t\t\t\t<i class="fa fa-plus"></i>\n\t\t\t\t\t\t\t\t\tPost\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t',
	controller: ["$http", "$scope", function controller($http, $scope) {
		var $ctrl = this;

		// .posts - History display {{{
		$ctrl.posts;
		$ctrl.isLoading = false;
		$ctrl.refresh = function () {
			if (!$ctrl.queryUrl) throw new Error('queryUrl is undefined');

			$ctrl.isLoading = true;

			var resolvedUrl = angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : $ctrl.queryUrl($ctrl);
			if (!resolvedUrl) throw new Error('Resovled URL is empty');

			$http.get(resolvedUrl).then(function (res) {
				if (!angular.isArray(res.data)) throw new Error('Expected history feed at URL "' + resolvedUrl + '" to be an array but got something else');
				$ctrl.posts = res.data;
			}).catch($ctrl.catcher).finally(function () {
				return $ctrl.isLoading = false;
			});
		};
		// }}}

		// .newPost - New post contents {{{
		$ctrl.isPosting = false;
		$ctrl.newPost = { body: '' };

		$ctrl.makePost = function () {
			if (!$ctrl.allowPost) throw new Error('Posting not allowed');
			if (!$ctrl.newPost.body) return; // Silently forget if the user is trying to publish empty contents

			var resolvedUrl = angular.isString($ctrl.postUrl) ? $ctrl.postUrl : $ctrl.postUrl($ctrl);
			if (!resolvedUrl) throw new Error('Resovled POST URL is empty');

			$ctrl.isPosting = true;
			$http.post(resolvedUrl, $ctrl.newPost).then(function () {
				return $ctrl.newPost.body = '';
			}).then(function () {
				return $ctrl.refresh();
			}).catch($ctrl.catcher).finally(function () {
				return $ctrl.isPosting = false;
			});

			$http.get(resolvedUrl);
		};
		// }}}

		// Init {{{
		$ctrl.$onInit = function () {
			return $ctrl.refresh();
		};
		// }}}
	}]
});
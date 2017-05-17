'use strict';

angular.module('angular-ui-history', ['angular-bs-tooltip', 'ngQuill', 'relativeDate', 'ui.gravatar']).component('uiHistory', {
	bindings: {
		allowPost: '<',
		queryUrl: '<',
		postUrl: '<',
		catcher: '<'
	},
	template: '\n\t\t<div class="ui-history">\n\t\t\t<div ng-repeat="post in $ctrl.posts track by post._id" ng-switch="post.type" class="ui-history-item">\n\t\t\t\t<div class="ui-history-timestamp" tooltip="{{post.date | date:\'medium\'}}">\n\t\t\t\t\t{{post.date | relativeDate}}\n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when="user.change" class="ui-history-user-change">\n\t\t\t\t\t<div class="ui-history-user-change-user">\n\t\t\t\t\t\t<a ng-href="{{post.user.url}}">\n\t\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if="post.field" class="ui-history-user-change-main">\n\t\t\t\t\t\tChanged\n\t\t\t\t\t\t{{post.field}}\n\t\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if="post.fields" class="ui-history-user-change-main">\n\t\t\t\t\t\tChanges:\n\t\t\t\t\t\t<div ng-repeat="(field, change) in post.fields track by field">\n\t\t\t\t\t\t\t{{field}}\n\t\t\t\t\t\t\t<em>{{change.from}}</em>\n\t\t\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t\t\t<em>{{change.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="user.comment" class="ui-history-user-comment">\n\t\t\t\t\t<div class="ui-history-user-comment-user">\n\t\t\t\t\t\t<a ng-href="{{post.user.url}}">\n\t\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ui-history-user-comment-main">\n\t\t\t\t\t\t<div ng-if="post.title" class="ui-history-user-comment-header">{{post.title}}</div>\n\t\t\t\t\t\t<div class="ui-history-user-comment-body" ng-bind-html="post.body"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="user.status" class="ui-history-user-status">\n\t\t\t\t\t<div class="ui-history-user-status-user">\n\t\t\t\t\t\t<a ng-href="{{post.user.url}}">\n\t\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ui-history-user-status-main" ng-bind-html="post.body"></div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="system.change" class="ui-history-system-change">\n\t\t\t\t\t<div ng-if="post.field">\n\t\t\t\t\t\tChanged\n\t\t\t\t\t\t{{post.field}}\n\t\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if="post.fields">\n\t\t\t\t\t\tChanges:\n\t\t\t\t\t\t<div ng-repeat="(field, change) in post.fields track by field">\n\t\t\t\t\t\t\t{{field}}\n\t\t\t\t\t\t\t<em>{{change.from}}</em>\n\t\t\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t\t\t<em>{{change.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="system.status" class="ui-history-system-status" ng-bind-html="post.body"></div>\n\t\t\t\t<div ng-switch-default class="ui-history-unknown">\n\t\t\t\t\tUnknown history type: [{{post.type}}]\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div ng-if="$ctrl.allowPost">\n\t\t\t\t<hr/>\n\t\t\t\t<div ng-show="$ctrl.isPosting" class="text-center">\n\t\t\t\t\t<h3><i class="fa fa-spinner fa-spin"></i> Posting...</h3>\n\t\t\t\t</div>\n\t\t\t\t<div ng-show="!$ctrl.isPosting">\n\t\t\t\t\t<form ng-submit="$ctrl.makePost()" class="form-horizontal">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t\t\t<ng-quill-editor ng-model="$ctrl.newPost.body" placeholder="Leave a comment...">\n\t\t\t\t\t\t\t\t\t<!-- ng-quill toolbar config {{{ -->\n\t\t\t\t\t\t\t\t\t<ng-quill-toolbar>\n\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-bold" ng-attr-title="{{\'Bold\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-italic" ng-attr-title="{{\'Italic\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-underline" ng-attr-title="{{\'Underline\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-strike" ng-attr-title="{{\'Strikethough\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-blockquote" ng-attr-title="{{\'Block Quote\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-code-block" ng-attr-title="{{\'Code Block\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-header" value="1" ng-attr-title="{{\'Header 1\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-header" value="2" ng-attr-title="{{\'Header 2\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-list" value="ordered" ng-attr-title="{{\'Numered list\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-list" value="bullet" ng-attr-title="{{\'Bulleted list\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-indent" value="-1" ng-attr-title="{{\'De-indent\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-indent" value="+1" ng-attr-title="{{\'Indent\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<select class="ql-color" ng-attr-title="{{\'Text color\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option selected="selected"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#e60000"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ff9900"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffff00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#008a00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#0066cc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#9933ff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffffff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#facccc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffebcc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffffcc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#cce8cc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#cce0f5"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ebd6ff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#bbbbbb"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#f06666"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffc266"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffff66"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#66b966"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#66a3e0"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#c285ff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#888888"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#a10000"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#b26b00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#b2b200"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#006100"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#0047b2"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#6b24b2"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#444444"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#5c0000"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#663d00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#666600"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#003700"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#002966"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#3d1466"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t\t\t<select class="ql-background" ng-attr-title="{{\'Background color\'}}">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option selected="selected"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#e60000"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ff9900"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffff00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#008a00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#0066cc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#9933ff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffffff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#facccc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffebcc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffffcc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#cce8cc"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#cce0f5"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ebd6ff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#bbbbbb"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#f06666"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffc266"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#ffff66"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#66b966"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#66a3e0"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#c285ff"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#888888"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#a10000"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#b26b00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#b2b200"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#006100"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#0047b2"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#6b24b2"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#444444"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#5c0000"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#663d00"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#666600"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#003700"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#002966"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="#3d1466"></option>\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-link" value="ordered" ng-attr-title="{{\'Add link\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="ql-formats">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class="ql-clean" value="ordered" ng-attr-title="{{\'Clear formatting\'}}"></button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t<div class="pull-right">\n\t\t\t\t\t\t\t\t\t\t\t\t<a ng-click="$ctrl.makePost()" class="btn btn-sm btn-success">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-plus"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tPost\n\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</ng-quill-toolbar>\n\t\t\t\t\t\t\t\t\t<!-- }}} -->\n\t\t\t\t\t\t\t\t</ng-quill-editor>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t',
	controller: ["$http", "$sce", "$scope", function controller($http, $sce, $scope) {
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
				$ctrl.posts = res.data.map(function (post) {
					if (post.type == 'user.comment' || post.type == 'user.status' || post.type == 'system.status') post.body = $sce.trustAsHtml(post.body);
					return post;
				});
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
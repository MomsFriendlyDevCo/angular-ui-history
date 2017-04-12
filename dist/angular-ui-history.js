'use strict';

angular.module('angular-ui-history', ['ui.gravatar']).component('uiHistory', {
	bindings: {},
	template: '\n\t\t<div class="ui-history">\n\t\t\t<div ng-repeat="post in $ctrl.posts track by post._id" ng-switch="post.type" class="ui-history-item">\n\t\t\t\t<div class="ui-history-timestamp">\n\t\t\t\t\t{{post.date}}\n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when="user.change" class="ui-history-comment">\n\t\t\t\t\t<div class="ui-history-comment-user">\n\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ui-history-comment-main">\n\t\t\t\t\t\t<div class="ui-history-comment-header">HEADER</div>\n\t\t\t\t\t\t<div class="ui-history-comment-body">\n\t\t\t\t\t\t\tChanged\n\t\t\t\t\t\t\t{{post.field}}\n\t\t\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="user.comment" class="ui-history-comment">\n\t\t\t\t\t<div class="ui-history-comment-user">\n\t\t\t\t\t\t<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ui-history-comment-main">\n\t\t\t\t\t\t<div class="ui-history-comment-header">HEADER</div>\n\t\t\t\t\t\t<div class="ui-history-comment-body">{{post.body}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-when="system.change" class="ui-history-change">\n\t\t\t\t\tChanged\n\t\t\t\t\t{{post.field}}\n\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t<i class="fa fa-long-arrow-right"></i>\n\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t</div>\n\t\t\t\t<div ng-switch-default class="ui-history-unknown">\n\t\t\t\t\tUnknown history type: [{{post.type}}]\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t',
	controller: ["$scope", function controller($scope) {
		var $ctrl = this;

		$ctrl.posts = [{ _id: 1, type: 'user.comment', date: 'Monday 19th April', user: { name: 'Mr Foo.', email: 'foo@test.com' }, body: 'Foo!' }, { _id: 2, type: 'user.comment', date: 'last Saturday', user: { name: 'Mr Bar.', email: 'bar@test.com' }, body: 'Bar!' }, { _id: 3, type: 'system.change', date: 'last Tuesday', field: 'status', from: 'Draft', to: 'Active' }, { _id: 4, type: 'user.comment', date: 'last Wednesday', user: { name: 'Mr Baz.', email: 'baz@test.com' }, body: 'Baz!' }, { _id: 5, type: 'user.change', date: '2:03pm', user: { name: 'Mr Baz.', email: 'baz@test.com' }, field: 'status', from: 'Active', to: 'Draft' }, { _id: 6, type: 'user.comment', date: '5 minutes ago', user: { name: 'Mr Foo.', email: 'foo@test.com' }, body: 'Foo!' }];
	}]
});
angular.module('angular-ui-history',[
	'ui.gravatar',
])
.component('uiHistory', {
	bindings: {
	},
	template: `
		<div class="ui-history">
			<div ng-repeat="post in $ctrl.posts track by post._id" ng-switch="post.type" class="ui-history-item">
				<div class="ui-history-timestamp">
					{{post.date}}
				</div>

				<div ng-switch-when="user.change" class="ui-history-comment">
					<div class="ui-history-comment-user">
						<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
					</div>
					<div class="ui-history-comment-main">
						<div class="ui-history-comment-header">HEADER</div>
						<div class="ui-history-comment-body">
							Changed
							{{post.field}}
							<em>{{post.from}}</em>
							<i class="fa fa-long-arrow-right"></i>
							<em>{{post.to}}</em>
						</div>
					</div>
				</div>
				<div ng-switch-when="user.comment" class="ui-history-comment">
					<div class="ui-history-comment-user">
						<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
					</div>
					<div class="ui-history-comment-main">
						<div class="ui-history-comment-header">HEADER</div>
						<div class="ui-history-comment-body">{{post.body}}</div>
					</div>
				</div>
				<div ng-switch-when="system.change" class="ui-history-change">
					Changed
					{{post.field}}
					<em>{{post.from}}</em>
					<i class="fa fa-long-arrow-right"></i>
					<em>{{post.to}}</em>
				</div>
				<div ng-switch-default class="ui-history-unknown">
					Unknown history type: [{{post.type}}]
				</div>
			</div>
		</div>
	`,
	controller: function($scope){
		var $ctrl = this;

		$ctrl.posts = [
			{_id: 1, type: 'user.comment', date: 'Monday 19th April', user: {name: 'Mr Foo.', email: 'foo@test.com'}, body: 'Foo!'},
			{_id: 2, type: 'user.comment', date: 'last Saturday', user: {name: 'Mr Bar.', email: 'bar@test.com'}, body: 'Bar!'},
			{_id: 3, type: 'system.change', date: 'last Tuesday', field: 'status', from: 'Draft', to: 'Active'},
			{_id: 4, type: 'user.comment', date: 'last Wednesday', user: {name: 'Mr Baz.', email: 'baz@test.com'}, body: 'Baz!'},
			{_id: 5, type: 'user.change', date: '2:03pm', user: {name: 'Mr Baz.', email: 'baz@test.com'}, field: 'status', from: 'Active', to: 'Draft'},
			{_id: 6, type: 'user.comment', date: '5 minutes ago', user: {name: 'Mr Foo.', email: 'foo@test.com'}, body: 'Foo!'},
		];
	},
});

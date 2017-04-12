angular.module('angular-ui-history',[])
.component('uiHistory', {
	bindings: {
	},
	template: `
		<div class="ui-history">
			<div ng-repeat="post in $ctrl.posts track by post._id" class="ui-history-comment">
				<div class="ui-history-comment-user">
					{{post.user.name}}
				</div>
				<div class="ui-history-comment-main">
					<div class="ui-history-comment-header">HEADER</div>
					<div class="ui-history-comment-body">{{post.body}}</div>
				</div>
			</div>
		</div>
	`,
	controller: function($scope){
		var $ctrl = this;

		$ctrl.posts = [
			{_id: 1, user: {name: 'Mr Foo.', email: 'foo@test.com'}, body: 'Foo!'},
			{_id: 2, user: {name: 'Mr Bar.', email: 'bar@test.com'}, body: 'Bar!'},
			{_id: 3, user: {name: 'Mr Baz.', email: 'baz@test.com'}, body: 'Baz!'},
		];
	},
});

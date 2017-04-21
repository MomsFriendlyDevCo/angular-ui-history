angular.module('angular-ui-history',[
	'ui.gravatar',
])
.component('uiHistory', {
	bindings: {
		allowPost: '<',
		queryUrl: '<',
		catcher: '<',
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
			<div ng-if="$ctrl.allowPost">
				<textarea ng-model="$ctrl.newPost.body"></textarea>
			</div>
		</div>
	`,
	controller: function($http, $scope) {
		var $ctrl = this;

		// .posts - History display {{{
		$ctrl.posts;
		$ctrl.isLoading = false;
		$ctrl.refresh = ()=> {
			if (!$ctrl.queryUrl) throw new Error('queryUrl is undefined');

			$ctrl.isLoading = true;

			var resolvedUrl = angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : $ctrl.queryUrl($ctrl);
			if (!resolvedUrl) throw new Error('Resovled URL is empty');

			$http.get(resolvedUrl)
				.then(res => {
					if (!angular.isArray(res.data)) throw new Error(`Expected history feed at URL "${resolvedUrl}" to be an array but got something else`);
					$ctrl.posts = res.data;
				})
				.catch($ctrl.catcher)
				.finally(()=> $ctrl.isLoading = false);
		};
		// }}}

		// .newPost - New post contents {{{
		$ctrl.newPost = {body: ''};

		$ctrl.makePost = ()=> {
		};
		// }}}

		// Init {{{
		$ctrl.$onInit = ()=> $ctrl.refresh();
		// }}}
	},
});

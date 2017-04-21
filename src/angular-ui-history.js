angular.module('angular-ui-history',[
	'angular-bs-tooltip',
	'relativeDate',
	'ui.gravatar',
])
.component('uiHistory', {
	bindings: {
		allowPost: '<',
		queryUrl: '<',
		postUrl: '<',
		catcher: '<',
	},
	template: `
		<div class="ui-history">
			<div ng-repeat="post in $ctrl.posts track by post._id" ng-switch="post.type" class="ui-history-item">
				<div class="ui-history-timestamp" tooltip="{{post.date | date:'medium'}}">
					{{post.date | relativeDate}}
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
						<div ng-if="post.title" class="ui-history-comment-header">{{post.title}}</div>
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
				<hr/>
				<div ng-show="$ctrl.isPosting" class="text-center">
					<h3><i class="fa fa-spinner fa-spin"></i> Posting...</h3>
				</div>
				<div ng-show="!$ctrl.isPosting">
					<form ng-submit="$ctrl.makePost()" class="form-horizontal">
						<div class="form-group">
							<div class="col-sm-12">
								<textarea ng-model="$ctrl.newPost.body" class="form-control" rows="10"></textarea>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12 text-right">
								<button type="submit" class="btn btn-success">
									<i class="fa fa-plus"></i>
									Post
								</button>
							</div>
						</div>
					</form>
				</div>
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
		$ctrl.isPosting = false;
		$ctrl.newPost = {body: ''};

		$ctrl.makePost = ()=> {
			if (!$ctrl.allowPost) throw new Error('Posting not allowed');

			var resolvedUrl = angular.isString($ctrl.postUrl) ? $ctrl.postUrl : $ctrl.postUrl($ctrl);
			if (!resolvedUrl) throw new Error('Resovled POST URL is empty');

			$ctrl.isPosting = true;
			$http.post(resolvedUrl, $ctrl.newPost)
				.then(()=> $ctrl.newPost.body = '')
				.then(()=> $ctrl.refresh())
				.catch($ctrl.catcher)
				.finally(()=> $ctrl.isPosting = false);

			$http.get(resolvedUrl)
		};
		// }}}

		// Init {{{
		$ctrl.$onInit = ()=> $ctrl.refresh();
		// }}}
	},
});

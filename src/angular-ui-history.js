angular.module('angular-ui-history',[
	'angular-bs-tooltip',
	'ngQuill',
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

				<div ng-switch-when="user.change" class="ui-history-user-change">
					<div class="ui-history-user-change-user">
						<a ng-href="{{post.user.url}}">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div class="ui-history-user-change-main">
						Changed
						{{post.field}}
						<em>{{post.from}}</em>
						<i class="fa fa-long-arrow-right"></i>
						<em>{{post.to}}</em>
					</div>
				</div>
				<div ng-switch-when="user.comment" class="ui-history-user-comment">
					<div class="ui-history-user-comment-user">
						<a ng-href="{{post.user.url}}">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div class="ui-history-user-comment-main">
						<div ng-if="post.title" class="ui-history-user-comment-header">{{post.title}}</div>
						<div class="ui-history-user-comment-body" ng-bind-html="post.body"></div>
					</div>
				</div>
				<div ng-switch-when="user.status" class="ui-history-user-status">
					<div class="ui-history-user-status-user">
						<a ng-href="{{post.user.url}}">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div class="ui-history-user-status-main" ng-bind-html="post.body"></div>
				</div>
				<div ng-switch-when="system.change" class="ui-history-system-change">
					Changed
					{{post.field}}
					<em>{{post.from}}</em>
					<i class="fa fa-long-arrow-right"></i>
					<em>{{post.to}}</em>
				</div>
				<div ng-switch-when="system.status" class="ui-history-system-status" ng-bind-html="post.body"></div>
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
							<div class="col-sm-12" style="height: 250px; margin-bottom: 50px">
								<ng-quill-editor ng-model="$ctrl.newPost.body" placeholder="Leave a comment...">
									<!-- ng-quill toolbar config {{{ -->
									<ng-quill-toolbar>
										<div>
											<span class="ql-formats">
												<button class="ql-bold" ng-attr-title="{{'Bold'}}"></button>
												<button class="ql-italic" ng-attr-title="{{'Italic'}}"></button>
												<button class="ql-underline" ng-attr-title="{{'Underline'}}"></button>
												<button class="ql-strike" ng-attr-title="{{'Strikethough'}}"></button>
											</span>
											<span class="ql-formats">
												<button class="ql-blockquote" ng-attr-title="{{'Block Quote'}}"></button>
												<button class="ql-code-block" ng-attr-title="{{'Code Block'}}"></button>
											</span>
											<span class="ql-formats">
												<button class="ql-header" value="1" ng-attr-title="{{'Header 1'}}"></button>
												<button class="ql-header" value="2" ng-attr-title="{{'Header 2'}}"></button>
											</span>
											<span class="ql-formats">
												<button class="ql-list" value="ordered" ng-attr-title="{{'Numered list'}}"></button>
												<button class="ql-list" value="bullet" ng-attr-title="{{'Bulleted list'}}"></button>
												<button class="ql-indent" value="-1" ng-attr-title="{{'De-indent'}}"></button>
												<button class="ql-indent" value="+1" ng-attr-title="{{'Indent'}}"></button>
											</span>
											<span class="ql-formats">
												<select class="ql-color" ng-attr-title="{{'Text color'}}">
													<option selected="selected"></option>
													<option value="#e60000"></option>
													<option value="#ff9900"></option>
													<option value="#ffff00"></option>
													<option value="#008a00"></option>
													<option value="#0066cc"></option>
													<option value="#9933ff"></option>
													<option value="#ffffff"></option>
													<option value="#facccc"></option>
													<option value="#ffebcc"></option>
													<option value="#ffffcc"></option>
													<option value="#cce8cc"></option>
													<option value="#cce0f5"></option>
													<option value="#ebd6ff"></option>
													<option value="#bbbbbb"></option>
													<option value="#f06666"></option>
													<option value="#ffc266"></option>
													<option value="#ffff66"></option>
													<option value="#66b966"></option>
													<option value="#66a3e0"></option>
													<option value="#c285ff"></option>
													<option value="#888888"></option>
													<option value="#a10000"></option>
													<option value="#b26b00"></option>
													<option value="#b2b200"></option>
													<option value="#006100"></option>
													<option value="#0047b2"></option>
													<option value="#6b24b2"></option>
													<option value="#444444"></option>
													<option value="#5c0000"></option>
													<option value="#663d00"></option>
													<option value="#666600"></option>
													<option value="#003700"></option>
													<option value="#002966"></option>
													<option value="#3d1466"></option>
												</select>
												<select class="ql-background" ng-attr-title="{{'Background color'}}">
													<option selected="selected"></option>
													<option value="#e60000"></option>
													<option value="#ff9900"></option>
													<option value="#ffff00"></option>
													<option value="#008a00"></option>
													<option value="#0066cc"></option>
													<option value="#9933ff"></option>
													<option value="#ffffff"></option>
													<option value="#facccc"></option>
													<option value="#ffebcc"></option>
													<option value="#ffffcc"></option>
													<option value="#cce8cc"></option>
													<option value="#cce0f5"></option>
													<option value="#ebd6ff"></option>
													<option value="#bbbbbb"></option>
													<option value="#f06666"></option>
													<option value="#ffc266"></option>
													<option value="#ffff66"></option>
													<option value="#66b966"></option>
													<option value="#66a3e0"></option>
													<option value="#c285ff"></option>
													<option value="#888888"></option>
													<option value="#a10000"></option>
													<option value="#b26b00"></option>
													<option value="#b2b200"></option>
													<option value="#006100"></option>
													<option value="#0047b2"></option>
													<option value="#6b24b2"></option>
													<option value="#444444"></option>
													<option value="#5c0000"></option>
													<option value="#663d00"></option>
													<option value="#666600"></option>
													<option value="#003700"></option>
													<option value="#002966"></option>
													<option value="#3d1466"></option>
												</select>
											</span>
											<span class="ql-formats">
												<button class="ql-link" value="ordered" ng-attr-title="{{'Add link'}}"></button>
											</span>
											<span class="ql-formats">
												<button class="ql-clean" value="ordered" ng-attr-title="{{'Clear formatting'}}"></button>
											</span>
											<div class="pull-right">
												<a ng-click="$ctrl.makePost()" class="btn btn-sm btn-success">
													<i class="fa fa-plus"></i>
													Post
												</a>
											</div>
										</div>
									</ng-quill-toolbar>
									<!-- }}} -->
								</ng-quill-editor>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	`,
	controller: function($http, $sce, $scope) {
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
					$ctrl.posts = res.data.map(post => {
						if (post.type == 'user.comment' || post.type == 'user.status' || post.type == 'system.status') post.body = $sce.trustAsHtml(post.body);
						return post;
					});
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
			if (!$ctrl.newPost.body) return; // Silently forget if the user is trying to publish empty contents

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

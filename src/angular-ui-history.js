angular.module('angular-ui-history',[
	'angular-bs-tooltip',
	'ngQuill',
	'relativeDate',
	'ui.gravatar',
])
.component('uiHistory', {
	bindings: {
		allowPost: '<',
		allowUpload: '<',
		queryUrl: '<',
		postUrl: '<',
		onUpload: '&?',
		onError: '&?',
	},
	template: `
		<div class="ui-history">
			<div style="display: none">
				<input id="angular-ui-history-upload-helper" name="file" multiple type="file"/>
			</div>
			<div ng-repeat="post in $ctrl.posts track by post._id" ng-switch="post.type" class="ui-history-item">
				<div class="ui-history-timestamp" tooltip="{{post.date | date:'medium'}}">
					{{post.date | relativeDate}}
				</div>

				<!-- type=user.change {{{ -->
				<div ng-switch-when="user.change" class="ui-history-user-change">
					<div class="ui-history-user-change-user">
						<a ng-href="{{post.user.url}}" target="_blank">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div ng-if="post.field" class="ui-history-user-change-main">
						Changed
						{{post.field}}
						<em>{{post.from}}</em>
						<i class="fa fa-long-arrow-right"></i>
						<em>{{post.to}}</em>
					</div>
					<div ng-if="post.fields" class="ui-history-user-change-main">
						Changes:
						<div ng-repeat="(field, change) in post.fields track by field">
							{{field}}
							<em>{{change.from}}</em>
							<i class="fa fa-long-arrow-right"></i>
							<em>{{change.to}}</em>
						</div>
					</div>
				</div>
				<!-- }}} -->
				<!-- type=user.comment {{{ -->
				<div ng-switch-when="user.comment" class="ui-history-user-comment">
					<div class="ui-history-user-comment-user">
						<a ng-href="{{post.user.url}}" target="_blank">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div class="ui-history-user-comment-main">
						<div ng-if="post.title" class="ui-history-user-comment-header">{{post.title}}</div>
						<div class="ui-history-user-comment-body" ng-bind-html="post.body"></div>
					</div>
				</div>
				<!-- }}} -->
				<!-- type=user.upload {{{ -->
				<div ng-switch-when="user.upload" class="ui-history-user-upload">
					<div class="ui-history-user-upload-user">
						<a ng-href="{{post.user.url}}" target="_blank">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div class="ui-history-user-upload-main">
						<div style="margin-bottom: 10px">Attached files:</div>
						<ul class="list-group">
							<a ng-if="post.filename" ng-href="{{post.url}}" target="_blank" class="list-group-item">
								<div ng-if="post.size" class="pull-right">{{post.size}}</div>
								<i ng-if="post.icon" class="{{post.icon}}"></i>
								{{post.filename || 'Unknown file'}}
							</a>
							<a ng-if="post.files" ng-repeat="file in post.files track by file.filename" ng-href="{{file.url}}" target="_blank" class="list-group-item">
								<div ng-if="file.size" class="pull-right">{{file.size}}</div>
								<i ng-if="file.icon" class="{{file.icon}}"></i>
								{{file.filename || 'Unknown file'}}
							</a>
						</ul>
					</div>
				</div>
				<!-- }}} -->
				<!-- type=user.status {{{ -->
				<div ng-switch-when="user.status" class="ui-history-user-status">
					<div class="ui-history-user-status-user">
						<a ng-href="{{post.user.url}}" target="_blank">
							<img gravatar-src="post.user.email" gravatar-size="50" gravatar-default="monsterid" tooltip="{{post.user.name}}"/>
						</a>
					</div>
					<div class="ui-history-user-status-main" ng-bind-html="post.body"></div>
				</div>
				<!-- }}} -->
				<!-- type=system.change {{{ -->
				<div ng-switch-when="system.change" class="ui-history-system-change">
					<div ng-if="post.field">
						Changed
						{{post.field}}
						<em>{{post.from}}</em>
						<i class="fa fa-long-arrow-right"></i>
						<em>{{post.to}}</em>
					</div>
					<div ng-if="post.fields">
						Changes:
						<div ng-repeat="(field, change) in post.fields track by field">
							{{field}}
							<em>{{change.from}}</em>
							<i class="fa fa-long-arrow-right"></i>
							<em>{{change.to}}</em>
						</div>
					</div>
				</div>
				<!-- }}} -->
				<!-- type=system.status {{{ -->
				<div ng-switch-when="system.status" class="ui-history-system-status" ng-bind-html="post.body"></div>
				<!-- }}} -->
				<!-- type unknown {{{ -->
				<div ng-switch-default class="ui-history-unknown">
					Unknown history type: [{{post.type}}]
				</div>
				<!-- }}} -->
			</div>
			<div ng-if="!$ctrl.posts.length" class="text-muted text-center">No history to display</div>
			<div ng-if="$ctrl.allowPost">
				<hr/>
				<div ng-show="$ctrl.isPosting" class="text-center">
					<h3><i class="fa fa-spinner fa-spin"></i> Posting...</h3>
				</div>
				<div ng-show="!$ctrl.isPosting">
					<form ng-submit="$ctrl.makePost()" class="form-horizontal">
						<div class="form-group">
							<div class="col-sm-12">
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
													<option ng-repeat="color in ::$ctrl.colors" value="{{::color}}"></option>
												</select>
												<select class="ql-background" ng-attr-title="{{'Background color'}}">
													<option selected="selected"></option>
													<option ng-repeat="color in ::$ctrl.colors" value="{{::color}}"></option>
												</select>
											</span>
											<span class="ql-formats">
												<button class="ql-link" value="ordered" ng-attr-title="{{'Add link'}}"></button>
											</span>
											<span class="ql-formats">
												<button class="ql-clean" value="ordered" ng-attr-title="{{'Clear formatting'}}"></button>
											</span>
											<div class="pull-right">
												<a ng-click="$ctrl.selectFiles()" class="btn btn-sm btn-default">
													<i class="fa fa-file-o"></i>
													Upload files...
												</a>
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
	controller: function($element, $http, $sce, $scope, $timeout) {
		var $ctrl = this;

		// Quill setup {{{
		$ctrl.colors = ['#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'],
		// }}}

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
				.catch(error => { if ($ctrl.onError) $ctrl.onError({error}) })
				.finally(()=> $ctrl.isLoading = false);
		};
		// }}}

		// .newPost - New post contents {{{
		$ctrl.isPosting = false;
		$ctrl.newPost = {body: ''};

		$ctrl.makePost = ()=> {
			if (!$ctrl.allowPost) throw new Error('Posting not allowed');
			if (!$ctrl.newPost.body) return; // Silently forget if the user is trying to publish empty contents

			var resolvedUrl =
				angular.isString($ctrl.postUrl) ? $ctrl.postUrl :
				angular.isFunction($ctrl.postUrl) ? $ctrl.postUrl($ctrl) :
				angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl :
				angular.isFunction($ctrl.queryUrl) ? $ctrl.queryUrl($ctrl) :
				undefined;

			if (!resolvedUrl) throw new Error('Resovled POST URL is empty');

			$ctrl.isPosting = true;
			$http.post(resolvedUrl, $ctrl.newPost)
				.then(()=> $ctrl.newPost.body = '')
				.then(()=> $ctrl.refresh())
				.catch(error => { if ($ctrl.onError) $ctrl.onError({error}) })
				.finally(()=> $ctrl.isPosting = false);

			$http.get(resolvedUrl)
		};
		// }}}

		// Uploads {{{
		$ctrl.isUploading = false;
		// Bind to element input[type=file] handlers and listen for changes {{{
		$element
			.find('input[type=file]')
			.on('change', function() { $timeout(()=> { // Attach to file widget and listen for change events so we can update the text
				var resolvedUrl =
					angular.isString($ctrl.postUrl) ? $ctrl.postUrl :
					angular.isFunction($ctrl.postUrl) ? $ctrl.postUrl($ctrl) :
					angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl :
					angular.isFunction($ctrl.queryUrl) ? $ctrl.queryUrl($ctrl) :
					undefined;
				if (!resolvedUrl) throw new Error('Resovled POST URL is empty');

				var formData = new FormData();
				Object.keys(this.files).forEach((k, i) => formData.append('file_' + i, this.files[k]));

				$ctrl.isUploading = true;
				$http.post(resolvedUrl, formData, {
					headers: {'Content-Type': undefined}, // Need to override the headers so that angular changes them over into multipart/mime
					transformRequest: angular.identity,
				})
					.then(res => { if ($ctrl.onUpload) $ctrl.onUpload(res) })
					.catch(error => { if ($ctrl.onError) $ctrl.onError({error}) })
					.then(()=> $ctrl.refresh())
					.finally(()=> $ctrl.isUploading = false)
			})});
		// }}}

		/**
		* Trigger the file upload dialog using the upload helper input element
		*/
		$ctrl.selectFiles = ()=> $element.find('#angular-ui-history-upload-helper').click();
		// }}}

		// Init {{{
		$ctrl.$onInit = ()=> $ctrl.refresh();
		// }}}
	},
});

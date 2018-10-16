"use strict";

angular.module('angular-ui-history', ['angular-bs-tooltip', 'ngQuill', 'ui.gravatar']) // Provider {{{
.provider('uiHistory', function () {
  this.defaults = {};

  this.$get = function () {
    return this;
  };
}) // }}}
// uiHistory (directive) {{{
.component('uiHistory', {
  bindings: {
    allowPost: '<?',
    allowUpload: '<?',
    allowUploadList: '<?',
    buttons: '<?',
    display: '<?',
    posts: '<?',
    queryUrl: '<?',
    postUrl: '<?',
    templates: '<?',
    onError: '&?',
    onLoadingStart: '&?',
    onLoadingStop: '&?',
    onQuery: '&?',
    onUpload: '&?',
    tags: '<?',
    userAvatar: '@?'
  },
  template: "\n\t\t<div class=\"ui-history\">\n\t\t\t<!-- Modal: Upload list {{{ -->\n\t\t\t<div class=\"modal fade angular-ui-history-modal-uploadList\">\n\t\t\t\t<div ng-if=\"$ctrl.showFilesModal\" class=\"modal-dialog\">\n\t\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t\t<a class=\"close\" data-dismiss=\"modal\"><i class=\"fa fa-times\"></i></a>\n\t\t\t\t\t\t\t<h4 class=\"modal-title\">Upload List</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t\t<ui-history-files\n\t\t\t\t\t\t\t\tallow-upload=\"$ctrl.allowUpload\"\n\t\t\t\t\t\t\t\tquery-url=\"$ctrl.queryUrl\"\n\t\t\t\t\t\t\t\tpost-url=\"$ctrl.postUrl\"\n\t\t\t\t\t\t\t\ton-error=\"$ctrl.onError\"\n\t\t\t\t\t\t\t\ton-loading-start=\"$ctrl.onLoadingStart\"\n\t\t\t\t\t\t\t\ton-loading-stop=\"$ctrl.onLoadingStop\"\n\t\t\t\t\t\t\t\ton-query=\"$ctrl.onQuery\"\n\t\t\t\t\t\t\t\ton-upload=\"$ctrl.onUpload\"\n\t\t\t\t\t\t\t></ui-history-files>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- }}} -->\n\t\t\t<div style=\"display: none\">\n\t\t\t\t<input id=\"angular-ui-history-upload-helper\" name=\"file\" multiple type=\"file\"/>\n\t\t\t</div>\n\t\t\t<!-- Header editor (if display='recentFirst') {{{ -->\n\t\t\t<div ng-if=\"$ctrl.allowPost && $ctrl.display == 'recentFirst'\">\n\t\t\t\t<div ng-show=\"$ctrl.isPosting\" class=\"text-center\">\n\t\t\t\t\t<h3><i class=\"fa fa-spinner fa-spin\"></i> Posting...</h3>\n\t\t\t\t</div>\n\t\t\t\t<div ng-show=\"!$ctrl.isPosting\">\n\t\t\t\t\t<ui-history-editor\n\t\t\t\t\t\tbuttons=\"$ctrl.buttons\"\n\t\t\t\t\t\ttemplates=\"$ctrl.templates\"\n\t\t\t\t\t\ton-post=\"$ctrl.makePost(body, tags)\"\n\t\t\t\t\t\ttags=\"$ctrl.tags\"\n\t\t\t\t\t></ui-history-editor>\n\t\t\t\t</div>\n\t\t\t\t<hr/>\n\t\t\t</div>\n\t\t\t<!-- }}} -->\n\t\t\t<div ng-repeat=\"post in $ctrl.posts | orderBy:'date':$ctrl.display=='recentFirst' track by (post.date + post._id)\" ng-switch=\"post.type\" class=\"ui-history-item\">\n\t\t\t\t<div class=\"ui-history-meta\">\n\t\t\t\t\t<div ng-if=\"post.tags && post.tags.length\" class=\"ui-history-tags\">\n\t\t\t\t\t\t<span ng-repeat=\"tag in post.tags\" class=\"ui-history-tag\">\n\t\t\t\t\t\t\t{{tag}}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"ui-history-timestamp\" tooltip=\"{{post.date | date:'medium'}}\">\n\t\t\t\t\t\t{{post.date | uiHistoryDate}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- type=user.change {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.change\" class=\"ui-history-user-change\">\n\t\t\t\t\t<div class=\"ui-history-user-change-user\">\n\t\t\t\t\t\t<user-history-avatar user=\"post.user\" user-avatar=\"{{$ctrl.userAvatar}}\"></user-history-avatar>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if=\"post.field\" class=\"ui-history-user-change-main\">\n\t\t\t\t\t\tChanged\n\t\t\t\t\t\t{{post.field}}\n\t\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if=\"post.fields\" class=\"ui-history-user-change-main\">\n\t\t\t\t\t\tChanges:\n\t\t\t\t\t\t<div ng-repeat=\"(field, change) in post.fields track by field\">\n\t\t\t\t\t\t\t{{field}}\n\t\t\t\t\t\t\t<em>{{change.from}}</em>\n\t\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t\t<em>{{change.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t\t<!-- type=user.comment {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.comment\" class=\"ui-history-user-comment\">\n\t\t\t\t\t<div class=\"ui-history-user-comment-user\">\n\t\t\t\t\t\t<user-history-avatar user=\"post.user\" user-avatar=\"{{$ctrl.userAvatar}}\"></user-history-avatar>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"ui-history-user-comment-main\">\n\t\t\t\t\t\t<div ng-if=\"post.user.company\" class=\"ui-history-company\">\n\t\t\t\t\t\t\t{{post.user.company}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div ng-if=\"post.title\" class=\"ui-history-user-comment-header\">{{post.title}}</div>\n\t\t\t\t\t\t<div class=\"ui-history-user-comment-body\" ng-bind-html=\"post.body\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t\t<!-- type=user.upload {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.upload\" class=\"ui-history-user-upload\">\n\t\t\t\t\t<div class=\"ui-history-user-upload-user\">\n\t\t\t\t\t\t<user-history-avatar user=\"post.user\" user-avatar=\"{{$ctrl.userAvatar}}\"></user-history-avatar>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"ui-history-user-upload-main\">\n\t\t\t\t\t\t<div style=\"margin-bottom: 10px\">Attached files:</div>\n\t\t\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t\t\t<a ng-if=\"post.filename\" ng-href=\"{{post.url}}\" target=\"_blank\" class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div ng-if=\"post.size\" class=\"pull-right\">{{post.size}}</div>\n\t\t\t\t\t\t\t\t<i ng-if=\"post.icon\" class=\"{{post.icon}}\"></i>\n\t\t\t\t\t\t\t\t{{post.filename || 'Unknown file'}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a ng-if=\"post.files\" ng-repeat=\"file in post.files track by file.filename\" ng-href=\"{{file.url}}\" target=\"_blank\" class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div ng-if=\"file.size\" class=\"pull-right\">{{file.size}}</div>\n\t\t\t\t\t\t\t\t<i ng-if=\"file.icon\" class=\"{{file.icon}}\"></i>\n\t\t\t\t\t\t\t\t{{file.filename || 'Unknown file'}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t\t<!-- type=user.status {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.status\" class=\"ui-history-user-status\">\n\t\t\t\t\t<div class=\"ui-history-user-status-user\">\n\t\t\t\t\t\t<user-history-avatar user=\"post.user\" user-avatar=\"{{$ctrl.userAvatar}}\"></user-history-avatar>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"ui-history-user-status-main\" ng-bind-html=\"post.body\"></div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t\t<!-- type=system.change {{{ -->\n\t\t\t\t<div ng-switch-when=\"system.change\" class=\"ui-history-system-change\">\n\t\t\t\t\t<div ng-if=\"post.field\">\n\t\t\t\t\t\tChanged\n\t\t\t\t\t\t{{post.field}}\n\t\t\t\t\t\t<em>{{post.from}}</em>\n\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t<em>{{post.to}}</em>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if=\"post.fields\">\n\t\t\t\t\t\tChanges:\n\t\t\t\t\t\t<div ng-repeat=\"(field, change) in post.fields track by field\">\n\t\t\t\t\t\t\t{{field}}\n\t\t\t\t\t\t\t<em>{{change.from}}</em>\n\t\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t\t<em>{{change.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t\t<!-- type=system.status {{{ -->\n\t\t\t\t<div ng-switch-when=\"system.status\" class=\"ui-history-system-status\" ng-bind-html=\"post.body\"></div>\n\t\t\t\t<!-- }}} -->\n\t\t\t\t<!-- type unknown {{{ -->\n\t\t\t\t<div ng-switch-default class=\"ui-history-unknown\">\n\t\t\t\t\tUnknown history type: [{{post.type}}]\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t</div>\n\t\t\t<div ng-if=\"!$ctrl.posts.length\" class=\"text-muted text-center\">No history to display</div>\n\t\t\t<!-- Footer editor (if !display || display='oldestFirst') {{{ -->\n\t\t\t<div ng-if=\"$ctrl.allowPost && (!$ctrl.display || $ctrl.display == 'oldestFirst')\">\n\t\t\t\t<hr/>\n\t\t\t\t<div ng-show=\"$ctrl.isPosting\" class=\"text-center\">\n\t\t\t\t\t<h3><i class=\"fa fa-spinner fa-spin\"></i> Posting...</h3>\n\t\t\t\t</div>\n\t\t\t\t<div ng-show=\"!$ctrl.isPosting\">\n\t\t\t\t\t<ui-history-editor\n\t\t\t\t\t\tbuttons=\"$ctrl.buttons\"\n\t\t\t\t\t\ttemplates=\"$ctrl.templates\"\n\t\t\t\t\t\ton-post=\"$ctrl.makePost(body, tags)\"\n\t\t\t\t\t></ui-history-editor>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- }}} -->\n\t\t</div>\n\t",
  controller: ["$element", "$http", "$q", "$rootScope", "$sce", "$scope", "$timeout", "uiHistory", function controller($element, $http, $q, $rootScope, $sce, $scope, $timeout, uiHistory) {
    var $ctrl = this; // refresh + .posts - History display + fetcher {{{

    $ctrl.posts;
    $ctrl.isLoading = false;
    /**
    * Load all posts (either via the queryUrl or from the posts array)
    * @returns {Promise}
    */

    $ctrl.refresh = function () {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!force && $ctrl.posts) return $q.resolve(); // User is supplying the post collection rather than us fetching it - do nothing

      $q.resolve() // Pre loading phase {{{
      .then(function () {
        return $ctrl.isLoading = true;
      }).then(function () {
        if (angular.isFunction($ctrl.onLoadingStart)) return $ctrl.onLoadingStart();
      }) // }}}
      // Data fetching - either via queryUrl or examining posts {{{
      .then(function () {
        if (angular.isString($ctrl.queryUrl) || angular.isFunction($ctrl.queryUrl)) {
          var resolvedUrl = angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : $ctrl.queryUrl($ctrl);
          if (!resolvedUrl) throw new Error('Resovled URL is empty');
          return $http.get(resolvedUrl).then(function (res) {
            if (!angular.isArray(res.data)) {
              throw new Error("Expected history feed at URL \"".concat(resolvedUrl, "\" to be an array but got something else"));
            } else {
              return res.data;
            }
          });
        } else if (angular.isArray($ctrl.posts)) {
          return $ctrl.posts;
        } else {
          throw new Error('Cannot refresh posts - neither queryUrl (func / array) or posts (array) are specified');
        }
      }) // }}}
      // Misc data mangling {{{
      .then(function (data) {
        $ctrl.posts = data.map(function (post) {
          if (typeof post.body === 'string' && (post.type == 'user.comment' || post.type == 'user.status' || post.type == 'system.status')) post.body = $sce.trustAsHtml(post.body);
          return post;
        });
      }) // }}}
      // If user has a onQuery handler wait for it to mangle / filter the data {{{
      .then(function () {
        if ($ctrl.onQuery) {
          var res = $ctrl.onQuery({
            posts: $ctrl.posts
          });
          if (angular.isArray(res)) $ctrl.posts = res;
        }
      }) // }}}
      // Post loading + catchers {{{
      .catch(function (error) {
        if (angular.isFunction($ctrl.onError)) $ctrl.onError({
          error: error
        });
      }).finally(function () {
        return $ctrl.isLoading = false;
      }).finally(function () {
        if (angular.isFunction($ctrl.onLoadingStop)) return $ctrl.onLoadingStop();
      }); // }}}
    }; // }}}
    // .makePost - New post contents {{{


    $ctrl.isPosting = false;

    $ctrl.makePost = function (body, tags) {
      if (!$ctrl.allowPost) throw new Error('Posting not allowed');
      if (!body) return; // Silently forget if the user is trying to publish empty contents

      var resolvedUrl = angular.isString($ctrl.postUrl) ? $ctrl.postUrl : angular.isFunction($ctrl.postUrl) ? $ctrl.postUrl($ctrl) : angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : angular.isFunction($ctrl.queryUrl) ? $ctrl.queryUrl($ctrl) : undefined;
      if (!resolvedUrl) throw new Error('Resovled POST URL is empty');
      return $q.resolve().then(function () {
        return $ctrl.isPosting = true;
      }).then(function () {
        return $http.post(resolvedUrl, {
          body: body,
          tags: tags
        });
      }).then(function () {
        return $ctrl.refresh(true);
      }).then(function () {
        return $rootScope.$broadcast('angular-ui-history.posted', body);
      }).catch(function (error) {
        if ($ctrl.onError) $ctrl.onError({
          error: error
        });
      }).finally(function () {
        return $ctrl.isPosting = false;
      });
    }; // }}}
    // Uploads {{{


    $ctrl.isUploading = false; // Bind to element input[type=file] handlers and listen for changes {{{

    $element.find('input[type=file]').on('change', function () {
      var _this = this;

      $timeout(function () {
        // Attach to file widget and listen for change events so we can update the text
        var resolvedUrl = angular.isString($ctrl.postUrl) ? $ctrl.postUrl : angular.isFunction($ctrl.postUrl) ? $ctrl.postUrl($ctrl) : angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : angular.isFunction($ctrl.queryUrl) ? $ctrl.queryUrl($ctrl) : undefined;
        if (!resolvedUrl) throw new Error('Resovled POST URL is empty');
        var formData = new FormData();
        Object.keys(_this.files).forEach(function (k, i) {
          return formData.append('file_' + i, _this.files[k]);
        }); // Tag files

        if ($ctrl.tags && $ctrl.tags.length) {
          $ctrl.tags.forEach(function (tag) {
            return formData.append('tags[]', tag);
          });
        }

        $ctrl.isUploading = true;
        $http.post(resolvedUrl, formData, {
          headers: {
            'Content-Type': undefined
          },
          // Need to override the headers so that angular changes them over into multipart/mime
          transformRequest: angular.identity
        }).then(function (res) {
          if ($ctrl.onUpload) $ctrl.onUpload(res);
        }).catch(function (error) {
          if ($ctrl.onError) $ctrl.onError({
            error: error
          });
        }).then(function () {
          return $ctrl.refresh();
        }).finally(function () {
          return $ctrl.isUploading = false;
        });
      });
    });
    $scope.$on('angular-ui-history.button.upload', function () {
      return $ctrl.selectFiles();
    }); // }}}

    /**
    * Trigger the file upload dialog using the upload helper input element
    */

    $ctrl.selectFiles = function () {
      return $element.find('#angular-ui-history-upload-helper').click();
    }; // }}}
    // File upload list {{{


    $ctrl.showFilesModal = false;
    $scope.$on('angular-ui-history.button.uploadList', function () {
      $ctrl.showFilesModal = true;
      $element.find('.angular-ui-history-modal-uploadList').modal('show').one('hidden.bs.modal', function () {
        return $scope.$apply(function () {
          return $ctrl.showFilesModal = true;
        });
      });
    }); // }}}
    // Init {{{

    $ctrl.$onInit = function () {
      // Apply defaults
      for (var key in uiHistory.defaults) {
        if ($ctrl[key] === undefined) $ctrl[key] = uiHistory.defaults[key];
      } // Buttons is empty fill it with something appropriate based on settings


      if (!$ctrl.buttons) {
        $ctrl.buttons = [];

        if ($ctrl.allowUpload) {
          if ($ctrl.allowUploadList === undefined || $ctrl.allowUploadList) $ctrl.buttons.push({
            title: 'File list',
            icon: 'fa fa-folder-o',
            action: 'uploadList'
          });
          $ctrl.buttons.push({
            title: 'Upload files...',
            icon: 'fa fa-file-o',
            action: 'upload'
          });
        }

        ;
      } // Watch the queryUrl - this fires initially to refresh everything but will also respond to changes by causing a refresh


      $scope.$watch('$ctrl.queryUrl', function () {
        return $ctrl.refresh(true);
      });
    }; // }}}

  }]
}) // }}}
// uiHistoryEditor (directive, post comment area) {{{

/**
* The post area WYSIWYG editor for angular-ui-history
* @param {function} onPost The function to be called when the user has finished writing text. If this is a promise the input will be cleared if it resolves correctly
* @param {array} [buttons] A collection of buttons to display in the editor. Each should have at least `title` and `onClick` with optional `icon`, `class`
*/
.component('uiHistoryEditor', {
  bindings: {
    buttons: '<',
    templates: '<',
    onPost: '&',
    tags: '<?'
  },
  template: "\n\t\t<form ng-submit=\"$ctrl.makePost()\" class=\"form-horizontal\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<ng-quill-editor ng-model=\"$ctrl.newPost.body\" placeholder=\"Leave a comment...\">\n\t\t\t\t\t\t<!-- ng-quill toolbar config {{{ -->\n\t\t\t\t\t\t<ng-quill-toolbar>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<button class=\"ql-bold\" ng-attr-title=\"{{'Bold'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-italic\" ng-attr-title=\"{{'Italic'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-underline\" ng-attr-title=\"{{'Underline'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-strike\" ng-attr-title=\"{{'Strikethough'}}\"></button>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<button class=\"ql-blockquote\" ng-attr-title=\"{{'Block Quote'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-code-block\" ng-attr-title=\"{{'Code Block'}}\"></button>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<button class=\"ql-header\" value=\"1\" ng-attr-title=\"{{'Header 1'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-header\" value=\"2\" ng-attr-title=\"{{'Header 2'}}\"></button>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<button class=\"ql-list\" value=\"ordered\" ng-attr-title=\"{{'Numered list'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-list\" value=\"bullet\" ng-attr-title=\"{{'Bulleted list'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-indent\" value=\"-1\" ng-attr-title=\"{{'De-indent'}}\"></button>\n\t\t\t\t\t\t\t\t\t<button class=\"ql-indent\" value=\"+1\" ng-attr-title=\"{{'Indent'}}\"></button>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<select class=\"ql-color\" ng-attr-title=\"{{'Text color'}}\">\n\t\t\t\t\t\t\t\t\t\t<option selected=\"selected\"></option>\n\t\t\t\t\t\t\t\t\t\t<option ng-repeat=\"color in ::$ctrl.colors\" value=\"{{::color}}\"></option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t<select class=\"ql-background\" ng-attr-title=\"{{'Background color'}}\">\n\t\t\t\t\t\t\t\t\t\t<option selected=\"selected\"></option>\n\t\t\t\t\t\t\t\t\t\t<option ng-repeat=\"color in ::$ctrl.colors\" value=\"{{::color}}\"></option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<button class=\"ql-link\" value=\"ordered\" ng-attr-title=\"{{'Add link'}}\"></button>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class=\"ql-formats\">\n\t\t\t\t\t\t\t\t\t<button class=\"ql-clean\" value=\"ordered\" ng-attr-title=\"{{'Clear formatting'}}\"></button>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t\t\t\t<a ng-if=\"$ctrl.templates\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t\t\t\t\t\tTemplate\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-chevron-down\"></i>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu\">\n\t\t\t\t\t\t\t\t\t\t\t<li ng-repeat=\"template in $ctrl.templates\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a ng-click=\"$ctrl.setTemplate(template)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i ng-if=\"template.icon\" ng-class=\"template.icon\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t{{template.title}}\n\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<a ng-repeat=\"button in $ctrl.buttons\" class=\"btn\" ng-class=\"$ctrl.class || 'btn-default'\" ng-click=\"$ctrl.runButton(button)\">\n\t\t\t\t\t\t\t\t\t\t<i ng-if=\"button.icon\" class=\"{{button.icon}}\"></i>\n\t\t\t\t\t\t\t\t\t\t{{button.title}}\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<a ng-click=\"$ctrl.makePost()\" class=\"btn btn-sm btn-success\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-plus\"></i>\n\t\t\t\t\t\t\t\t\t\tPost\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</ng-quill-toolbar>\n\t\t\t\t\t\t<!-- }}} -->\n\t\t\t\t\t</ng-quill-editor>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</form>\n\t",
  controller: ["$scope", function controller($scope) {
    var $ctrl = this; // Quill setup {{{

    $ctrl.colors = ['#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'], // }}}
    $ctrl.newPost = {
      body: ''
    };

    $ctrl.makePost = function () {
      if (!$ctrl.onPost) throw new Error('Post content provided but no onPost binding defined');
      var ret = $ctrl.onPost({
        body: $ctrl.newPost.body,
        tags: $ctrl.newPost.tags
      });
      if (!ret) return; // Didn't return a promise - ignore

      if (angular.isFunction(ret.then)) ret.then(function () {
        $ctrl.newPost = {
          body: ''
        };
        if ($ctrl.tags && $ctrl.tags.length) $ctrl.newPost.tags = $ctrl.tags.map(function (t) {
          return t;
        });
      });
    };

    $scope.$on('angular-ui-history.post', $ctrl.makePost);
    /**
    * Execute the event bubbling for the given button
    * @param {Object} button The button object that triggered the event
    * @fires angular-ui-history.button.${button.action}
    * @fires angular-ui-history.button
    */

    $ctrl.runButton = function (button) {
      if (button.action) $scope.$emit("angular-ui-history.button.".concat(button.action), button);
      $scope.$emit('angular-ui-history.button', button);
    };
    /**
    * Select a template to use
    * @param {Object} template The selected template object
    * @fires angular-ui-history.template.${template}
    */


    $ctrl.setTemplate = function (template) {
      $ctrl.newPost.body = template.content;
      $scope.$emit('angular-ui-history.template', template);
    }; // Init {{{


    $ctrl.$onInit = function () {
      // Initialize tags to for new comments
      if ($ctrl.tags && $ctrl.tags.length) $ctrl.newPost.tags = $ctrl.tags.map(function (t) {
        return t;
      });
    }; // }}}

  }]
}) // }}}
// uiHistoryFiles (directive, file listing area) {{{
.component('uiHistoryFiles', {
  bindings: {
    allowUpload: '<',
    queryUrl: '<',
    postUrl: '<',
    onError: '&?',
    onLoadingStart: '&?',
    onLoadingStop: '&?',
    onQuery: '&?',
    onUpload: '&?'
  },
  controller: ["$http", "$scope", function controller($http, $scope) {
    var $ctrl = this;
    $ctrl.uploads; // Data refresher {{{

    $ctrl.isLoading;

    $ctrl.refresh = function () {
      if (!$ctrl.queryUrl) throw new Error('queryUrl is undefined');
      var resolvedUrl = angular.isString($ctrl.queryUploadsUrl) ? $ctrl.queryUploadsUrl : angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : $ctrl.queryUrl($ctrl);
      if (!resolvedUrl) throw new Error('Resovled URL for uploads is empty');
      $ctrl.isLoading = true;
      if ($ctrl.onLoadingStart) $ctrl.onLoadingStart();
      $http.get(resolvedUrl).then(function (res) {
        if (!angular.isArray(res.data)) throw new Error("Expected file upload feed at URL \"".concat(resolvedUrl, "\" to be an array but got something else"));
        $ctrl.uploads = res.data.filter(function (i) {
          return i.type === undefined || i.type == 'user.upload';
        }) // Filter out non-uploads
        .reduce(function (uploads, post) {
          // Compress multiple files into a flattened array
          if (post.filename) {
            // Single file
            uploads.push(post);
            return uploads;
          } else if (post.files) {
            // Multiple files
            return uploads.concat(post.files);
          }
        }, []).sort(function (a, b) {
          // Sort by filename A-Z
          if (a.filename == b.filename) return 0;
          return a.filename > b.filename ? 1 : -1;
        }).filter(function (i, index, arr) {
          return index == 0 || arr[index - 1].filename != i.filename;
        }); // Remove duplicate filenames
      }).catch(function (error) {
        if ($ctrl.onError) $ctrl.onError({
          error: error
        });
      }).finally(function () {
        return $ctrl.isLoading = false;
      }).finally(function () {
        if ($ctrl.onLoadingStop) $ctrl.onLoadingStop();
      });
    };

    $scope.$evalAsync($ctrl.refresh); // }}}
  }],
  template: "\n\t\t<div ng-if=\"$ctrl.isLoading\">\n\t\t\t<h2>\n\t\t\t\t<i class=\"fa fa-spinner fa-spin\"></i>\n\t\t\t\tFetching list of files...\n\t\t\t</h2>\n\t\t</div>\n\t\t<div ng-if=\"!$ctrl.isLoading && $ctrl.uploads.length == 0\" class=\"text-muted text-center\">\n\t\t\tNo file uploads found\n\t\t</div>\n\t\t<ul class=\"list-group\">\n\t\t\t<a ng-repeat=\"file in $ctrl.uploads track by file.filename\" ng-href=\"{{file.url}}\" target=\"_blank\" class=\"list-group-item\">\n\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t<span class=\"badge\">{{file.size}}</span>\n\t\t\t\t</div>\n\t\t\t\t{{file.filename}}\n\t\t\t</a>\n\t\t</ul>\n\t"
}) // }}}
// uiHistoryLatest
// Show the most recent history item
// {{{
.component('uiHistoryLatest', {
  bindings: {
    queryUrl: '<?',
    onError: '&?',
    onLoadingStart: '&?',
    onLoadingStop: '&?',
    onQuery: '&?'
  },
  template: "\n\t\t<div class=\"ui-history ui-history-latest\">\n\t\t\t<div class=\"ui-history-item\" ng-switch=\"$ctrl.post.type\" ng-if=\"$ctrl.post\">\n\t\t\t\t<div class=\"ui-history-meta\">\n\t\t\t\t\t<a ng-href=\"{{$ctrl.post.user.url}}\" target=\"_blank\" class=\"ui-history-latest-user\">\n\t\t\t\t\t\t{{$ctrl.post.user.name}}{{$ctrl.post.date ? ',' : ''}}\n\t\t\t\t\t</a>\n\t\t\t\t\t<div class=\"ui-history-timestamp\" >\n\t\t\t\t\t\t{{$ctrl.post.date ? ($ctrl.post.date | uiHistoryDate) : ''}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- type=user.change {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.change\" class=\"ui-history-user-change\">\n\t\t\t\t\t<div ng-if=\"$ctrl.post.field\" class=\"ui-history-user-change-main\">\n\t\t\t\t\t\t<a ng-href=\"{{$ctrl.post.user.url}}\" target=\"_blank\">\n\t\t\t\t\t\t\t{{$ctrl.post.user.name}}\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\tChanged\n\t\t\t\t\t\t{{$ctrl.post.field}}\n\t\t\t\t\t\t<em>{{$ctrl.post.from}}</em>\n\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t<em>{{$ctrl.post.to}}</em>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if=\"$ctrl.post.fields\" class=\"ui-history-user-change-main\">\n\t\t\t\t\t\tChanges:\n\t\t\t\t\t\t<div ng-repeat=\"(field, change) in $ctrl.post.fields track by field\">\n\t\t\t\t\t\t\t{{field}}\n\t\t\t\t\t\t\t<em>{{change.from}}</em>\n\t\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t\t<em>{{change.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\n\t\t\t\t<!-- type=user.comment {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.comment\" class=\"ui-history-user-comment\">\n\t\t\t\t\t<div ng-if=\"$ctrl.post.user.company\" class=\"ui-history-company\">\n\t\t\t\t\t\t{{$ctrl.post.user.company}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"ui-history-user-comment-main\">\n\t\t\t\t\t\t<div ng-if=\"$ctrl.post.title\" class=\"ui-history-user-comment-header\">{{$ctrl.post.title}}</div>\n\t\t\t\t\t\t<div class=\"ui-history-user-comment-body\" ng-bind-html=\"$ctrl.post.body\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\n\t\t\t\t<!-- type=user.upload {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.upload\" class=\"ui-history-user-upload\">\n\t\t\t\t\t<div class=\"ui-history-user-upload-main\">\n\t\t\t\t\t\t<div style=\"margin-bottom: 10px\"><a ng-href=\"{{$ctrl.post.user.url}}\" target=\"_blank\" >{{$ctrl.post.user.name}}</a> attached files:</div>\n\t\t\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t\t\t<a ng-if=\"$ctrl.post.filename\" ng-href=\"{{$ctrl.post.url}}\" target=\"_blank\" class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div ng-if=\"$ctrl.post.size\" class=\"pull-right\">{{$ctrl.post.size}}</div>\n\t\t\t\t\t\t\t\t<i ng-if=\"$ctrl.post.icon\" class=\"{{$ctrl.post.icon}}\"></i>\n\t\t\t\t\t\t\t\t{{$ctrl.post.filename || 'Unknown file'}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a ng-if=\"$ctrl.post.files\" ng-repeat=\"file in $ctrl.post.files track by file.filename\" ng-href=\"{{file.url}}\" target=\"_blank\" class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<div ng-if=\"file.size\" class=\"pull-right\">{{file.size}}</div>\n\t\t\t\t\t\t\t\t<i ng-if=\"file.icon\" class=\"{{file.icon}}\"></i>\n\t\t\t\t\t\t\t\t{{file.filename || 'Unknown file'}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\n\t\t\t\t<!-- type=user.status {{{ -->\n\t\t\t\t<div ng-switch-when=\"user.status\" class=\"ui-history-user-status\">\n\t\t\t\t\t<div class=\"ui-history-user-status-main\" ng-bind-html=\"$ctrl.post.body\"></div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\n\t\t\t\t<!-- type=system.change {{{ -->\n\t\t\t\t<div ng-switch-when=\"system.change\" class=\"ui-history-system-change\">\n\t\t\t\t\t<div ng-if=\"$ctrl.post.field\">\n\t\t\t\t\t\tChanged\n\t\t\t\t\t\t{{$ctrl.post.field}}\n\t\t\t\t\t\t<em>{{$ctrl.post.from}}</em>\n\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t<em>{{$ctrl.post.to}}</em>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-if=\"$ctrl.post.fields\">\n\t\t\t\t\t\tChanges:\n\t\t\t\t\t\t<div ng-repeat=\"(field, change) in $ctrl.post.fields track by field\">\n\t\t\t\t\t\t\t{{field}}\n\t\t\t\t\t\t\t<em>{{change.from}}</em>\n\t\t\t\t\t\t\t<i class=\"fa fa-long-arrow-right\"></i>\n\t\t\t\t\t\t\t<em>{{change.to}}</em>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\n\t\t\t\t<!-- type=system.status {{{ -->\n\t\t\t\t<div ng-switch-when=\"system.status\" class=\"ui-history-system-status\" ng-bind-html=\"$ctrl.post.body\"></div>\n\t\t\t\t<!-- }}} -->\n\n\t\t\t\t<!-- type unknown {{{ -->\n\t\t\t\t<div ng-switch-default class=\"ui-history-unknown\">\n\t\t\t\t\tUnknown history type: [{{$ctrl.post.type}}]\n\t\t\t\t</div>\n\t\t\t\t<!-- }}} -->\n\t\t\t</div>\n\t\t</div>\n\t",
  controller: ["$http", "$q", "$sce", "$scope", "$filter", function controller($http, $q, $sce, $scope, $filter) {
    var $ctrl = this; // Fetcher {{{

    $ctrl.posts;
    $ctrl.post; // Latest post
    // }}}

    /**
    * Load all posts (either via the queryUrl or from the posts array)
    * @returns {Promise}
    */

    $ctrl.refresh = function () {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!force && $ctrl.posts) return $q.resolve(); // User is supplying the post collection rather than us fetching it - do nothing

      $q.resolve() // Pre loading phase {{{
      .then(function () {
        return $ctrl.isLoading = true;
      }).then(function () {
        if (angular.isFunction($ctrl.onLoadingStart)) return $ctrl.onLoadingStart();
      }) // }}}
      // Data fetching - either via queryUrl or examining posts {{{
      .then(function () {
        if (angular.isString($ctrl.queryUrl) || angular.isFunction($ctrl.queryUrl)) {
          var resolvedUrl = angular.isString($ctrl.queryUrl) ? $ctrl.queryUrl : $ctrl.queryUrl($ctrl);
          if (!resolvedUrl) throw new Error('Resovled URL is empty');
          return $http.get(resolvedUrl).then(function (res) {
            if (!angular.isArray(res.data)) {
              throw new Error("Expected history feed at URL \"".concat(resolvedUrl, "\" to be an array but got something else"));
            } else {
              return res.data;
            }
          }).catch(function (err) {
            return console.log('err:', err);
          });
        } else if (angular.isArray($ctrl.posts)) {
          return $ctrl.posts;
        } else {
          throw new Error('Cannot refresh posts - neither queryUrl (func / array) or posts (array) are specified');
        }
      }) // }}}
      // Misc data mangling {{{
      .then(function (data) {
        $ctrl.posts = data;
      }) // }}}
      // If user has a onQuery handler wait for it to mangle / filter the data {{{
      .then(function () {
        if ($ctrl.onQuery) {
          var res = $ctrl.onQuery({
            posts: $ctrl.posts
          });
          if (angular.isArray(res)) $ctrl.posts = res;
        }
      }) // }}}
      // Most recent post
      .then(function () {
        $ctrl.posts = $filter('orderBy')($ctrl.posts, 'date', true);
        $ctrl.post = $ctrl.posts[0];
      }) // }}}
      // Misc data mangling {{{
      .then(function (data) {
        var post = $ctrl.post;
        if (typeof post.body === 'string' && (post.type == 'user.comment' || post.type == 'user.status' || post.type == 'system.status')) post.body = $sce.trustAsHtml(post.body);
      }) // }}}
      // Post loading + catchers {{{
      .catch(function (error) {
        if (angular.isFunction($ctrl.onError)) $ctrl.onError({
          error: error
        });
      }).finally(function () {
        return $ctrl.isLoading = false;
      }).finally(function () {
        if (angular.isFunction($ctrl.onLoadingStop)) return $ctrl.onLoadingStop();
      }); // }}}
    }; // }}}
    // Init {{{


    $ctrl.$onInit = function () {
      $scope.$watch('$ctrl.queryUrl', function () {
        return $ctrl.refresh(true);
      });
    }; // }}}

  }]
}) // }}}
// uiHistoryAvatar

/**
* User avatar
* @param {Object} user Post author
* @param {string} [userAvatar] Template to use as the avatar for the user
*/
// {{{
.component('userHistoryAvatar', {
  bindings: {
    user: '<',
    userAvatar: '@?'
  },
  template: "\n\t\t<div ng-if=\"$ctrl.userAvatar\" ng-include=\"$ctrl.userAvatar\"></div>\n\t\t<a ng-if=\"!$ctrl.userAvatar\" ng-href=\"{{$ctrl.user.url}}\" target=\"_blank\">\n\t\t\t<img gravatar-src=\"$ctrl.user.email\" gravatar-size=\"50\" gravatar-default=\"monsterid\" tooltip=\"{{$ctrl.user.name}}\"/>\n\t\t</a>\n\t"
}) // }}}
// uiHistoryDate (filter) {{{

/**
* Parse a date object into a human readable string
* Code chearfully stolen and refactored from https://github.com/samrith-s/relative_date
* @see https://github.com/samrith-s/relative_date
*/
.filter('uiHistoryDate', function () {
  return function (value) {
    var date = moment(value);
    if (!date._isValid) return 'Invalid date';
    var diff = moment(Date.now()).diff(date, 'days');

    if (diff < 0) {
      return moment(date).fromNow(true) + ' from now';
    } else if (diff < 1) {
      return date.format('h:mma');
    } else if (diff === 1) {
      return 'Yesterday';
    } else if (diff > 1 && diff < 7) {
      return date.format('dddd');
    } else {
      return date.format('D MMMM, YYYY');
    }
  };
}); // }}}
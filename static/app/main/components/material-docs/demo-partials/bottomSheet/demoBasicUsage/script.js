angular.module('bottomSheetDemo1', ['ngMaterial'])
.config(function($mdIconProvider) {
    $mdIconProvider
      .icon('share-arrow', '/static/assets/angular-material-assets/img/icons/share-arrow.svg', 24)
      .icon('upload', '/static/assets/angular-material-assets/img/icons/upload.svg', 24)
      .icon('copy', '/static/assets/angular-material-assets/img/icons/copy.svg', 24)
      .icon('print', '/static/assets/angular-material-assets/img/icons/print.svg', 24)
      .icon('hangout', '/static/assets/angular-material-assets/img/icons/hangout.svg', 24)
      .icon('mail', '/static/assets/angular-material-assets/img/icons/mail.svg', 24)
      .icon('message', '/static/assets/angular-material-assets/img/icons/message.svg', 24)
      .icon('copy2', '/static/assets/angular-material-assets/img/icons/copy2.svg', 24)
      .icon('facebook', '/static/assets/angular-material-assets/img/icons/facebook.svg', 24)
      .icon('twitter', '/static/assets/angular-material-assets/img/icons/twitter.svg', 24);
  })
.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';

  $scope.showListBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    });
  };

  $scope.showGridBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      clickOutsideToClose: false
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .textContent(clickedItem['name'] + ' clicked!')
              .position('top right')
              .hideDelay(1500)
          );
    });
  };
})

.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {

  $scope.items = [
    { name: 'Share', icon: 'share-arrow' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'hangout' },
    { name: 'Mail', icon: 'mail' },
    { name: 'Message', icon: 'message' },
    { name: 'Copy', icon: 'copy2' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.run(function($templateRequest) {

    var urls = [
      '/static/assets/angular-material-assets/img/icons/share-arrow.svg',
      '/static/assets/angular-material-assets/img/icons/upload.svg',
      '/static/assets/angular-material-assets/img/icons/copy.svg',
      '/static/assets/angular-material-assets/img/icons/print.svg',
      '/static/assets/angular-material-assets/img/icons/hangout.svg',
      '/static/assets/angular-material-assets/img/icons/mail.svg',
      '/static/assets/angular-material-assets/img/icons/message.svg',
      '/static/assets/angular-material-assets/img/icons/copy2.svg',
      '/static/assets/angular-material-assets/img/icons/facebook.svg',
      '/static/assets/angular-material-assets/img/icons/twitter.svg'
    ];

    angular.forEach(urls, function(url) {
      $templateRequest(url);
    });

  });

angular.module('toolbarDemo2', ['ngMaterial'])

.controller('TitleController', function($scope) {
  $scope.title = 'My App Title';
})
.controller('AppCtrl', function($scope) {
  var imagePath = '/static/assets/angular-material-assets/img/list/60.jpeg';

  $scope.todos = [];
  for (var i = 0; i < 15; i++) {
    $scope.todos.push({
      face: imagePath,
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }
});

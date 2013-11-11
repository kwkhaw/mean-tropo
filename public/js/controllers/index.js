angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'Socket', function ($scope, Global, socket) {
    $scope.global = Global;
    socket.on('sms', function (ev, data) {
      $scope.theData = data;
      console.log($scope.theData.text);
    });
}]);

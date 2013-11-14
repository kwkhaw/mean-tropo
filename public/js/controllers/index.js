angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'Socket', function ($scope, Global, Socket) {
    $scope.global = Global;
    Socket.on('sms', function (ev, data) {
      $scope.theData = data;
      console.log($scope.theData.text);
    });
}]);

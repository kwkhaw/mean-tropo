angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'btford.socket-io', function ($scope, Global, socket) {
    $scope.global = Global;
    socket.forward('sms', $scope);
    $scope.$on('socket:sms', function (ev, data) {
      $scope.theData = data;
      console.log($scope.theData.text);
    });
}]);

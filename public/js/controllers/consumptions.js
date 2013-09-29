angular.module('mean.consumptions').controller('ConsumptionsController', ['$scope', '$rootScope', '$routeParams', '$location', 'Global', 'Consumptions', function ($scope, $rootScope, $routeParams, $location, Global, Consumptions) {
    $scope.global = Global;

    $scope.create = function() {
        var consumption = new Consumptions({
            title: this.title,
            content: this.content
        });
        consumption.$save(function(response) {
            $location.path("consumptions/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(consumption) {
        consumption.$remove();  

        for (var i in $scope.consumptions) {
            if ($scope.consumptions[i] == consumption) {
                $scope.consumptions.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var consumption = $scope.consumption;
        if (!consumption.updated) {
            consumption.updated = [];
        }
        consumption.updated.push(new Date().getTime());

        consumption.$update(function() {
            $location.path('consumptions/' + consumption._id);
        });
    };

    $scope.find = function(query) {
        Consumptions.query(query, function(consumptions) {
            $scope.consumptions = consumptions;
        });
    };

    $scope.findOne = function() {
        Consumptions.get({
            consumptionId: $routeParams.consumptionId
        }, function(consumptions) {
            $scope.consumptions = consumptions;
            console.log('before broadcasting!!!!');
            $rootScope.$broadcast("_CONSUMPTION_UPDATE", consumptions);
            console.log('after broadcasting!!!!');
        });
    };
}]);

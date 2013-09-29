//Consumptions service used for consumptions REST endpoint
angular.module('mean.consumptions').factory("Consumptions", ['$resource', function($resource) {
    return $resource('consumptions/:consumptionId', {
        consumptionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

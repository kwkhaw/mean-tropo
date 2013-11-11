window.app = angular.module('mean', [
              'ngCookies',
              'ngResource',
              'ui.bootstrap',
              'ui.route',
              'mean.system',
              'mean.articles',
              'mean.consumptions',
              'mean.socket']);

angular.module('mean.socket', []);
angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.consumptions', []);

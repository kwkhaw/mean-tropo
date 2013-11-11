window.app = angular.module('mean', [
              'ngCookies',
              'ngResource',
              'ui.bootstrap',
              'ui.route',
              'mean.system',
              'mean.articles',
              'mean.consumptions',
              'btford.socket-io']);

angular.module('mean.system', ['btford.socket-io']);
angular.module('mean.articles', []);
angular.module('mean.consumptions', []);

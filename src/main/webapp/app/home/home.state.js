(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('commerce', {
            parent: 'app',
            url: '/commerce',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/commerce.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('list', {
            parent: 'app',
            url: '/list',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/list.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('item', {
            parent: 'app',
            url: '/item/:id',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/item.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();

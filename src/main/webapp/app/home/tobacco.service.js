(function() {

    'use strict';

    angular.module('gatewayApp').factory('TobaccoServer', TobaccoServer);

    TobaccoServer.$inject = ['$resource'];

    function TobaccoServer($resource) {

        return {
            Industries: $resource('tobacco/api/industries', {}, {
                'get': {method: 'GET'},
                'post': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'update': {method: 'PUT'}
            }),
            Industry: $resource('tobacco/api/industries/:id', {}, {
                'get': {method: 'GET'}
            }),
            Commerces: $resource('tobacco/api/commerce', {}, {
                'get': {method: 'GET'},
                'post': {method: 'POST'}
            })
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$stateParams', '$location', '$injector', 'Principal', 'LoginService', '$state', 'TobaccoServer'];

    function HomeController ($scope, $stateParams, $location, $injector, Principal, LoginService, $state, TobaccoServer) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }

        /*
        * *********************************************
        * */


        vm.tobacco = {};
        vm.tobacco.date = new Date();
        vm.format = "yyyy-MM-dd HH:mm:ss";
        vm.popup1 = {
            opened: false
        };
        vm.dateOptions = {
            maxDate : new Date()
        };

        vm.open1 = function () {
            vm.popup1.opened = true;
        };

        vm.reset = function () {
            vm.tobacco = {};
        };

        vm.submit = function () {
            TobaccoServer.Industries.post({
                name: vm.tobacco.name,
                manufacturer: vm.tobacco.manufacturer,
                date: vm.tobacco.date,
                desc: vm.tobacco.desc
            }, function (res) {
                var state = $injector.get('$state');
                if(res && res.id) {
                    alert("录入成功！");
                    $state.go("list", null, {reload: true});
                    $('.modal-backdrop').hide();
                }
            })
        };


        /*
        * ******************************************
        * */

        vm.tobaccoList = [];
        vm.currentPage = 1;
        vm.itemsPerPage = 10;

        function loadQueryParams() {
            TobaccoServer.Industries.get({
                page: vm.currentPage - 1,
                size: vm.itemsPerPage
            }, {}, function(res) {
                if (res.content && res.content.length > 0) {
                    vm.tobaccoList = res.content;
                }
            })
        }

        loadQueryParams();

        vm.lookCode = function (qrcode) {
            // $('#qrcode').html("");
            // var qrcode = new QRCode('qrcode', {
            //     text: 'your content',
            //     width: 256,
            //     height: 256,
            //     colorDark : '#000000',
            //     colorLight : '#ffffff',
            //     correctLevel : QRCode.CorrectLevel.H
            // });
            //
            // qrcode.clear();
            // qrcode.makeCode('http://192.168.5.196:8080/#/item/' + id);
            // qrcode.makeCode('<h3>abc</h3>abc');
            vm.qrCodeImg = qrcode;
        };


        /*
        * *********************************
        * */

        var id = $stateParams.id;
        vm.item = {};
        vm.item.commerces = [];
        if (id) {
            TobaccoServer.Industry.get({
                id : id
            }, function(res) {
                if (res) {
                    vm.item.name = res.name;
                    vm.item.manufacturer = res.manufacturer;
                    vm.item.date = res.date;
                    vm.item.desc = res.desc;
                    vm.item.commerces = res.commerces;
                }
            })
        }


        /*
        * ***************************
        * */

        vm.add = function (id) {
            vm.industryId = id;
        };

        vm.addCommerce = function () {
            TobaccoServer.Commerces.post({
                commpanyname : vm.tobacco.commpanynane,
                retailname : vm.tobacco.retailname,
                industryId: vm.industryId
            }, function(res) {
                var state = $injector.get('$state');
                if(res && res.id) {
                    alert("添加成功!");
                    state.reload(state.current.name);
                    $('.modal-backdrop').hide();
                }
            })
        }
    }
})();

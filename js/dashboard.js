'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DashboardCtrl', function ($scope,$location,$sce,$rootScope) {
                                                                            $scope.dashboardUrl = $sce.trustAsResourceUrl("https://" + $location.$$host + "/kibana4/");//$scope.currentProject.url);
                                                                          });

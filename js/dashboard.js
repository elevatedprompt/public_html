'use strict';

/*!
 * Copyright(c) 2016 elevatedprompt
 * EPStack API
 * Author: Colin Goss
 * @ngdoc function
 * @name clientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * 
 */
angular.module('clientApp')
  .controller('DashboardCtrl', function ($scope,$location,$sce,$rootScope) {
                                                                            $scope.dashboardUrl = $sce.trustAsResourceUrl("https://" + $location.$$host + "/kibana4/");//$scope.currentProject.url);
                                                                          });

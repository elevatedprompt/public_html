'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:HqCtrl
 * @description
 * # HqCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('HqCtrl', function ($scope,$location,$sce,$rootScope) {
                                                                      $scope.hqUrl = $sce.trustAsResourceUrl("https://"+ $location.$$host +"/elastic/_plugin/HQ/?url=https://" + $location.$$host +"/elastic/");
                                                                      });

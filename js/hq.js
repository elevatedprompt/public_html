'use strict';

/*!
 * Copyright(c) 2016 elevatedprompt
 * EPStack API
 * Author: Colin Goss
 * @ngdoc function
 * @name clientApp.controller:HqCtrl
 * @description
 * # HqCtrl
 *
 */

angular.module('clientApp')
  .controller('HqCtrl', function ($scope,$location,$sce,$rootScope) {
                                                                      $scope.hqUrl = $sce.trustAsResourceUrl("https://"+ $location.$$host +"/elastic/_plugin/hq/?url=https://" + $location.$$host +"/elastic/");
                                                                      });

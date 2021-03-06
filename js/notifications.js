/*!
 * Copyright(c) 2016 elevatedprompt
 * EPStack API
 * Author: Colin Goss
 * @ngdoc function
 * @name clientApp.controller:NotificationsCtrl
 * @description
 * # NotificationsCtrl
 * Controller of the clientApp
 */


  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:ConfigfilesCtrl
   * @description
   * # ConfigfilesCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('NotificationsCtrl', function ($scope,$http,$location,$rootScope) {
      var selectedSearch=null

        $scope.notification = {};
        $scope.notification.thresholdType          = "";
        $scope.notification.notificationName       = "";
        //$scope.selectedSearch         =
        $scope.notification.thresholdCount         = 5;
        $scope.notification.timeValue              = 15;
        $scope.notification.timeFrame              = "m";
        $scope.notification.enabled                = false;
        $scope.notification.notificationDescription= "";
        $scope.notification.notifyEmail            = "";
        $scope.notification.htmlEmail              = false;
        $scope.notification.checkFreq              = 5;//check frequency in minutes
        $scope.notification.telegramChatId         = "";
        $scope.notification.notifyData             = "";
        $scope.notification.timeStamp              = new Date().toString();

        var notificationService = "https://" + $location.$$host + "/api/Notification";

        var data = {};
        var config = {headers:{
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
          }};

          $http.post(notificationService+"/GetNotifications",data,config)
            .success(function(data)
              {
                console.log(data);
                 $scope.notificationFiles=data;
              });
        $scope.pageLoad= function(){
            var notificationService = "https://" + $location.$$host + "/api/Notification";
            var data = {};
            var config = {headers:{
              "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
              }};
            $http.post(notificationService+"/ListSearches",data,config)
              .success(function(data)
                {
                  console.log(data);
                   $scope.avalibleSearches=data;
                });
            $scope.refreshScreen();
        }
        $scope.refreshScreen = function(){
          var notificationService = "https://" + $location.$$host + "/api/Notification";
          var data = {};
          var config = {headers:{
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            }};
           $http.post(notificationService+"/GetNotifications",data,config)
             .success(function(data)
               {
                 console.log(data);
                  $scope.notificationFiles=data;
               });
        }

        $scope.pageLoad();

        $scope.deleteFile = function(notificationName){
                                                      $scope.filelocation = "";
                                                      $scope.conffilename = notificationName;

                                                      var retVal = prompt("You must confirm to delete this file enter DELETE in the box below \n\n are you sure you want to continue?", "WARNING");

                                                      if(retVal=="DELETE"){
                                                        var data = "notificationName="+ encodeURIComponent(notificationName);
                                                        var config = {headers:{
                                                                                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                                                                              }};

                                                        var result = $http.post(notificationService+"/DeleteNotification",data,config)
                                                          .success(function(data){
                                                                                    console.log(data);
                                                                                    $scope.configuration = data;
                                                                                  });
                                                      }
                                                      $scope.refreshScreen();
                                                    };

        $scope.updateTextArea = function(configuration){

                                                        $scope.filelocation = "";
                                                        $scope.filename = configuration;

                                                        var data = "configfile="+ encodeURIComponent(configuration);
                                                        var config = {headers:{
                                                                                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                                                                              }};

                                                        var result = $http.post(notificationService+"/GetNotification",data,config)
                                                          .success(function(data){
                                                                                    console.log(data);
                                                                                    $scope.notification = data;
                                                                                    $scope.notification.timeStamp = new Date().toString();
                                                                                    $scope.notification.enabled = data.enabled=='true';
                                                                                    $scope.notification.htmlEmail = data.htmlEmail=='true';
                                                                                  });
                                                      };

      $scope.saveNotification = function(){
        //Confirm that the timeFrame is no less than 15 minutes.
                                    if($scope.notification.notificationName==""){
                                                                                  alert('you must supply a notification name!');
                                                                                  return;
                                                                                }
                                    if($scope.notification.selectedSearch==""){
                                                                                alert('you must select a search name!');
                                                                                return;
                                                                              }
                                    $scope.notification.timeStamp = new Date().toString();
                                    var data = "notificationName="
                                        + encodeURIComponent($scope.notification.notificationName);
                                        data+= "&selectedSearch="
                                        + encodeURIComponent($scope.notification.selectedSearch);
                                        data+= "&thresholdType="
                                        + encodeURIComponent($scope.notification.thresholdType);
                                        data+= "&thresholdCount="
                                        + encodeURIComponent($scope.notification.thresholdCount);
                                        data+= "&timeValue="
                                        + encodeURIComponent($scope.notification.timeValue);
                                        data+= "&timeFrame="
                                        + encodeURIComponent($scope.notification.timeFrame);
                                        data+= "&enabled="
                                        + encodeURIComponent($scope.notification.enabled);
                                        data+= "&notificationDescription="
                                        + encodeURIComponent($scope.notification.notificationDescription);
                                        data+= "&notifyEmail="
                                        + encodeURIComponent($scope.notification.notifyEmail);
                                        data+= "&htmlEmail="
                                        + encodeURIComponent($scope.notification.htmlEmail);
                                        data+= "&checkFreq="
                                        + encodeURIComponent($scope.notification.checkFreq);
                                        data+= "&telegramChatId="
                                        + encodeURIComponent($scope.notification.telegramChatId);
                                        data+= "&notifyData="
                                        + encodeURIComponent($scope.notification.notifyData);
                                        data+= "&timeStamp="
                                        + encodeURIComponent($scope.notification.timeStamp);
                                    var config = {headers:{
                                                            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                                                          }};
                                    var operation =notificationService+"/UpdateNotification";
                                    console.log(data);
                                    var result = $http.post(operation,data,config)
                                      .success(function(data){
                                                            console.log(data);
                                                            $scope.refreshScreen();
                                                          }).error(function(err){
                                                                                $scope.refreshScreen();
                                                                                console.log(err);
                                                                              });
                                    };

    $scope.testNotifyService = function(){
                                            console.log("test notfiy");
                                            notificationService = "https://" + $location.$$host + "/api/Notification";
                                            var data = {};
                                            var config = {headers:{
                                                                  "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                                                                  }};

                                            $http.post(notificationService+"/PingCluster",data,config)
                                              .success(function(data){
                                                                      console.log(data);
                                                                       $scope.searchList=data;
                                                                    });
                                          };

      //Clear form
      $scope.createNotification= function(){
                                            $scope.notification.notificationName        = "";
                                            $scope.notification.selectedSearch          = {};
                                            $scope.notification.thresholdType           = 'Max';
                                            $scope.notification.thresholdCount          = 0;
                                            $scope.notification.timeValue               = 0;
                                            $scope.notification.timeFrame               = 'm';
                                            $scope.notification.enabled                 = false;
                                            $scope.notification.notificationDescription = "";
                                            $scope.notification.notifyEmail             = "";
                                            $scope.notification.htmlEmail               = false;
                                            $scope.notification.checkFreq               = 5;//check frequency in minutes
                                            $scope.notification.telegramChatId         = "";
                                            $scope.notification.notifyData             = "";
                                            $scope.notification.timeStamp              = new Date().toString();
                                          };

    });

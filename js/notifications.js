//Responsibilities.
/*
*** Incomplete.

Listing notifications
adding notifications
removing notifications
updating notifications

searches
list searches
retreive search info
create notification from search
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
        $scope.searchList= [
          {ID:"1",Title:"Search Example",SearchString:"searchstring"},
          {ID:"2",Title:"Another Search",SearchString:"searchstring"},
          {ID:"3",Title:"Another Example",SearchString:"searchstring"},
        ];
        $scope.NotificationList = [
          {NotifyID:"1",SearchID:"1",Threshold:"2",Period:""},//Period in minutes.
          {NotifyID:"2",SearchID:"1",Threshold:"2",Period:""},
          {NotifyID:"3",SearchID:"2",Threshold:"2",Period:""},
          {NotifyID:"4",SearchID:"3",Threshold:"2",Period:""},
        ];
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
        $scope.notification.htmlEmail              =false;
        $scope.notification.checkFreq = 1;//check frequency in minutes


        var notificationService = "https://" + $location.$$host + "/api/Notification";
        if($rootScope.checkService!=null)
          {clearInterval($rootScope.checkService);}

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
                  $scope.notifications=data;
               });
        }

        $scope.pageLoad();

        $scope.deleteFile = function(configuration){
          $scope.filelocation = "";
          $scope.conffilename = configuration;

          var retVal = prompt("You must confirm to delete this file enter DELETE in the box below \n\n are you sure you want to continue?", "WARNING");

          if(retVal=="DELETE")
          {
            var data = "conffilename="+ encodeURIComponent(configuration);
            var config = {headers:{
                                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                                  }};

            var result = $http.post(notificationService+"/DeleteNotification",data,config)
              .success(function(data)
                {
                  console.log(data);
                  $scope.configuration = data;
                });
          }
          $scope.refreshScreen();
        }

      $scope.updateTextArea = function(configuration){

        $scope.filelocation = "";
        $scope.filename = configuration;

        var data = "configfile="+ encodeURIComponent(configuration);
        var config = {headers:{
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};

        var result = $http.post(notificationService+"/GetNotification",data,config)
          .success(function(data)
            {
              console.log(data);
              //$scope.configuration = data;
              $scope.notification = data;
              $scope.notification.enabled = data.enabled=='true';
              $scope.notification.htmlEmail = data.htmlEmail=='true';
            });
      };


$scope.saveNotification = function()
{

  if($scope.notification.notificationName=="")
  {
    alert('you must supply a notification name!');
    return;
  }
  if($scope.notification.selectedSearch=="")
  {
    alert('you must select a search name!');
    return;
  }

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


  var config = {headers:{
    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
  }};
  var operation =notificationService+"/UpdateNotification";
  console.log(data);
  var result = $http.post(operation,data,config)
    .success(function(data){
        console.log(data);
        //$scope.configuration = data;
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
        .success(function(data)
          {
            console.log(data);
             $scope.searchList=data;
          });
    };

      //Clear form
      $scope.createNotification= function(){
        $scope.notification.notificationName = "";
        $scope.notification.selectedSearch = {};
        $scope.notification.thresholdType = 'Max';
        $scope.notification.thresholdCount = 0;
        $scope.notification.timeValue = 0;
        $scope.notification.timeFrame = 'm';
        $scope.notification.enabled = false;
        $scope.notification.notificationDescription = "";
        $scope.notification.notifyEmail = "";
        $scope.notification.htmlEmail =false;
        $scope.notification.checkFreq = 1;//check frequency in minutes
      };

    });

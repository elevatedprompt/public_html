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
    .controller('NotificationsCtrl', function ($scope,$http,$location) {
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
        $scope.notification.thresholdType          = "Max";
        $scope.notification.notificationName       = "Notification Name";
        //$scope.selectedSearch         =
        $scope.notification.thresholdCount         = 10;
        $scope.notification.timeValue              = 10;
        $scope.notification.timeFrame              = "m";
        $scope.notification.enabled                = false;
        $scope.notification.notificationDescription= "Notification Description";
        $scope.notification.notifyEmail            = "example@domain.com";

        servicelocation = "https://" + $location.$$host + "/api/Notification";

      //  servicelocation = "https://" + $location.$$host + "/api/";
        var data = {};
        var config = {headers:{
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
          }};

          $http.post(servicelocation+"/GetNotifications",data,config)
            .success(function(data)
              {
                console.log(data);
                 $scope.notificationFiles=data;
              });

        $scope.refreshScreen = function()
        {
          servicelocation = "https://" + $location.$$host + "/api/Notification";
          var data = {};
          var config = {headers:{
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            }};
           $http.post(servicelocation+"/GetNotifications",data,config)
             .success(function(data)
               {
                 console.log(data);
                  $scope.notifications=data;
               });

          servicelocation = "https://" + $location.$$host + "/api/Notification";
          var data = {};
          var config = {headers:{
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            }};
          $http.post(servicelocation+"/ListSearches",data,config)
            .success(function(data)
              {
                console.log(data);
                 $scope.avalibleSearches=data;
              });
        }


        $scope.refreshScreen();

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

            var result = $http.post(servicelocation+"/DeleteNotification",data,config)
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

        var result = $http.post(servicelocation+"/GetNotification",data,config)
          .success(function(data)
            {
              console.log(data);
              //$scope.configuration = data;
              $scope.notification = data;
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

  var config = {headers:{
    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
  }};
  var operation =servicelocation+"/UpdateNotification";
  var result = $http.post(operation,data,config)
    .success(function(data)
      {
        console.log(data);
        //$scope.configuration = data;
      });

  //    $scope.refreshScreen();
  };
      $scope.testNotifyService = function(){
        console.log("test notfiy");
        servicelocation = "https://" + $location.$$host + "/api/Notification";
        var data = {};
        var config = {headers:{
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
          }};

        $http.post(servicelocation+"/PingCluster",data,config)
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
      };

    });

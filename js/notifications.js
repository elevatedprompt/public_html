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

        $scope.thresholdType          = "Max";
        $scope.notificationName       = "Notification Name";
        //$scope.selectedSearch         =
        $scope.thresholdCount         = 10;
        $scope.timeValue              = 10;
        $scope.timeFrame              = "m";
        $scope.notificationDescription= "Notification Description";


        servicelocation = "https://" + $location.$$host + "/api/";
        var data = {};
        var config = {headers:{
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
          }};

        $scope.refreshScreen = function()
        {
          servicelocation = "https://" + $location.$$host + "/api/Notification";
          var data = {};
          var config = {headers:{
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            }};
          // $http.post(servicelocation+"/GetNotifications",data,config)
          //   .success(function(data)
          //     {
          //       console.log(data);
          //        $scope.notifications=data;
          //     });

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

        $scope.createNotificationConfig= function(){
          $scope.configuration = "";
          $scope.filename = "";
          $scope.filelocation = '/opt/API/Notification/';
        };

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
              $scope.configuration = data;
            });
      };


$scope.saveNotification = function()
{

  if($scope.notificationName=="")
  {
    alert('you must supply a notification name!');
    return;
  }
  if($scope.selectedSearch=="")
  {
    alert('you must select a search name!');
    return;
  }

  var data = "notificationName="
  + encodeURIComponent($scope.notificationName);
  data+= "&selectedSearch="
  + encodeURIComponent($scope.selectedSearch);
  data+= "&thresholdType="
  + encodeURIComponent($scope.thresholdType);
  data+= "&thresholdCount="
  + encodeURIComponent($scope.thresholdCount);
  data+= "&timeValue="
  + encodeURIComponent($scope.timeValue);
  data+= "&timeFrame="
  + encodeURIComponent($scope.timeFrame);
  data+= "&notificationDescription="
  + encodeURIComponent($scope.notificationDescription);

  var config = {headers:{
    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
  }};

  var result = $http.post(servicelocation+"/Notification/UpdateNotification",data,config)
    .success(function(data)
      {
        console.log(data);
        $scope.configuration = data;

      });


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

    });

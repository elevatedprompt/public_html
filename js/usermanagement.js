'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UsermanagementCtrl
 * @description
 * # UsermanagementCtrl
 * Controller of the clientApp
 */

angular.module('clientApp')
  .controller('UsermanagementCtrl', function (
    $location,
    $scope,
    $http
  ) {
      servicelocation = "https://" + $location.$$host + "/api/";
      $scope.userManagmentModel = {};
  //  listUsers();
    $scope.checkServiceStatus = function() {
        console.log("Interval occurred check status");
        var data = "servicename=elasticsearch";
        var config = {headers:{
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};
        $http.post(servicelocation+"IsServiceRunning",data,config)
          .success(function(data)
            {
               $scope.systemsettings.elasticsearchstatusbit=data;
            });
         data = "servicename=logstash";
        $http.post(servicelocation+"IsServiceRunning",data,config)
          .success(function(data)
            {
               $scope.systemsettings.logstashstatusbit=data;
            });
         data = "servicename=kibana4";
        $http.post(servicelocation+"IsServiceRunning",data,config)
          .success(function(data)
            {
               $scope.systemsettings.kibanastatusbit=data;
            });
    };

    $scope.clearForm = function() {
      $scope.userManagmentModel.selectedUser = "";
      $scope.userManagmentModel.passwd = "";
    };
      console.log("Get List of users");
      var data = "";
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};
      $http.post(servicelocation+"ListUsers",data,config)
        .success(function(data)
          {
             $scope.userManagmentModel.userList=data;
          });


    $scope.listUsers = function(){
      console.log("Get List of users");
      var data = "";
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};
      $http.post(servicelocation+"ListUsers",data,config)
        .success(function(data)
          {
             $scope.userManagmentModel.userList=data;
          });
    };

    $scope.updateUser = function(user,password){
      console.log("Get List of users");
      var data = "User=" +user + ";Password=" + password;
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};
      $http.post(servicelocation+"UpdateUser",data,config)
        .success(function(data)
          {
             $scope.listUsers();
          });
    };

    $scope.deleteUsers = function(user){
      console.log("Get List of users");
      var data = "User=" + user;
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};
      $http.post(servicelocation+"DeleteUser",data,config)
        .success(function(data)
          {
             $scope.listUsers();
          });
    };
  });

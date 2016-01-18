'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:UsermanagementCtrl
 * @description
 * # UsermanagementCtrl
 * Controller of the clientApp
 */

angular.module('clientApp')
.directive('confirmDelete', ->
  return {
    replace: true,
    templateUrl: 'templates/deleteConfirmation.html',
    scope: {
      onConfirm: '&'
    }
    controller: ($scope) ->
      $scope.isDeleting = false
      $scope.startDelete = ->
        $scope.isDeleting = true
      $scope.cancel = ->
        $scope.isDeleting = false
      $scope.confirm = ->
        $scope.onConfirm()
  }
)# End of directive
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

///TODO: Add validation for users ("no space. no semicolon(:) no & or special character")
///TODO: Add validation for password ("no space. no semicolon(:) no & or special character")
    $scope.updateUser = function(){
      console.log("Update User: " + $scope.userManagmentModel.selectedUser);

      var data = "User=" +$scope.userManagmentModel.selectedUser.trim() + "&passwd=" + $scope.userManagmentModel.passwd.trim();
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};
      $http.post(servicelocation+"UpdateUser",data,config)
        .success(function(data)
          {
             $scope.listUsers();
             $scope.clearForm();
          });
    };

    $scope.deleteUser = function(){
      console.log("Delete User: " + $scope.userManagmentModel.selectedUser);
      var data = "User=" + $scope.userManagmentModel.selectedUser;
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};
      $http.post(servicelocation+"DeleteUser",data,config)
        .success(function(data)
          {
             $scope.listUsers();
             $scope.clearForm();
          });
    };
  });

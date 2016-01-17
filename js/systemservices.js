//'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SystemservicesCtrl
 * @description
 * # SystemservicesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SystemservicesCtrl',function (
    $location,
    $scope,
  //  $parse,
    $http
  ) {
    servicelocation = "https://" + $location.$$host + "/api/";

    $scope.systemsettings = {};

    //TODO: update next line to the current setting for the server.
//    $scope.systemsettings.logstashstatusbit = true;
//    $scope.systemsettings.kibanastatusbit = true;
//    $scope.systemsettings.elasticsearchstatusbit = true;

    $http.post(servicelocation+"GetTimeZone",data,config)
      .success(function(data)
        {
          $scope.systemsettings.timezone = data;
        });

    console.log("Get Service Status")
    var data = "servicename=elasticsearch";
    var config = {headers:{
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    }};
    $http.post(servicelocation+"GetServiceStatus",data,config)
      .success(function(data)
        {
           $scope.systemsettings.elasticsearchstatus=data;
           //TODO: parse data looking for string.
        });
    $http.post(servicelocation+"IsServiceRunning",data,config)
      .success(function(data)
        {
           $scope.systemsettings.elasticsearchstatusbit=data;
           //TODO: parse data looking for string.
        });
    data = "servicename=logstash";
    $http.post(servicelocation+"GetServiceStatus",data,config)
          .success(function(data)
            {
               $scope.systemsettings.logstashstatus=data;
               //TODO: parse data looking for string.
            });
    $http.post(servicelocation+"IsServiceRunning",data,config)
          .success(function(data)
            {
               $scope.systemsettings.logstashstatusbit=data;
               //TODO: parse data looking for string.
            });
    data = "servicename=kibana4";

    $http.post(servicelocation+"GetServiceStatus",data,config)
      .success(function(data)
        {
           $scope.systemsettings.kibanastatus=data;
           //TODO: parse data looking for string.
        });
    $http.post(servicelocation+"IsServiceRunning",data,config)
      .success(function(data)
        {
           $scope.systemsettings.kibanastatusbit=data;
           //TODO: parse data looking for string.
        });

    $scope.saveTimeZone = function(timezone) {
      $scope.selectedTimezone = timezone;
      var data = "timezone=" + timezone;
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};

      $http.post(servicelocation+"UpdateTimeZone",data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
      $http.post(servicelocation+"GetServiceStatus",data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
    };

    $scope.updateStatus = function(status, service)//status: Boolean running/not running, service: "serviceName"
    {
        if(status)
        {
          var button = document.getElementsByName(service + 'Button');
          button.value = "Stop";
          var status = document.getElementsByName(service + 'Status');
        }
        else {
          var button = document.getElementsByName(service + 'Button');
          button.value = "Start";
          var status = document.getElementsByName(service + 'Status');
        }
    };

    $scope.cycleElasticSearch = function() {
      var data = "servicename=elasticsearch";
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};

      var method = "StartService";
      if($scope.systemsettings.elasticsearchstatusbit)
        {method = "StopService";}
      $http.post(servicelocation+method,data,config)
        .success(function(data)
          {
             $scope.systemsettings.elasticsearchstatus=data;
          });
      $http.post(servicelocation+"GetServiceStatus",data,config)
        .success(function(data)
          {
             $scope.systemsettings.elasticsearchstatus=data;
          });
      $scope.systemsettings.elasticsearchstatusbit = !$scope.systemsettings.elasticsearchstatusbit;
      $scope.updateStatus($scope.systemsettings.elasticsearchstatusbit,'elastic');
    };

    $scope.cycleKibana = function() {
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};
      var data = "servicename=kibana4";

      var method = "StartService";
      if($scope.systemsettings.kibanastatusbit)
        {method = "StopService";}
      $http.post(servicelocation+method,data,config)
        .success(function(data)
          {
             $scope.systemsettings.kibanastatus=data;
          });
      $http.post(servicelocation+"GetServiceStatus",data,config)
        .success(function(data)
          {
             $scope.systemsettings.kibanastatus=data;
          });
      $scope.systemsettings.kibanastatusbit = !$scope.systemsettings.kibanastatusbit;
      $scope.updateStatus($scope.systemsettings.kibanastatusbit,'kibana');
    };

    $scope.cycleLogstash = function() {
      var data = "servicename=logstash";
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};

      var method = "StartService";
      if($scope.systemsettings.logstashstatusbit)
        {method = "StopService";}
      $http.post(servicelocation+method,data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
      $http.post(servicelocation+"GetServiceStatus",data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
      $scope.systemsettings.logstashstatusbit = !$scope.systemsettings.logstashstatusbit;
      $scope.updateStatus($scope.systemsettings.logstashstatusbit,'logstash');
    };
  });

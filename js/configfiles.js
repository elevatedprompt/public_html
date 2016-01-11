'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ConfigfilesCtrl
 * @description
 * # ConfigfilesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ConfigfilesCtrl', function ($scope,$http,$location) {

      $scope.configfiles = [{filename:"logstash.conf", configuration:"config data"},
                        {filename:"filter.conf", configuration:"config data2"},
                        {filename:"bro.conf", configuration:"config data3"}];
      $scope.elastic = [{filename:"elastic.yml", configuration:"config data"},
                      {filename:"filter.yml", configuration:"config data2"}];
      $scope.cron = [{filename:"admin", configuration:"/cron/admin"}];

      servicelocation = "https://" + $location.$$host + "/api/";
      var data = {};
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};
      $http.post(servicelocation+"/GetLogstashConfigDirectoryListing",data,config)
        .success(function(data)
          {
            console.log(data);
             $scope.configfiles=data;
          });
      $http.post(servicelocation+"/GetElasticConfigDirectoryListing",data,config)
        .success(function(data)
          {
            console.log(data);
             $scope.elastic=data;
          });

      $http.post(servicelocation+"/GetCronJobDirectory",data,config)
        .success(function(data)
          {
            console.log(data);
             $scope.cron=data;
          });

    $scope.updateTextArea = function(configuration){

      $scope.filelocation = "";
      $scope.filename = configuration;

      var data = "configfile="+ encodeURIComponent(configuration);
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};

      var result = $http.post(servicelocation+"/GetConfFile",data,config)
        .success(function(data)
          {
            console.log(data);
            $scope.configuration = data;
          });
    };

    //function to set the default file location for logstash files
    // /etc/logstash/conf.d/
    $scope.createLogstashConfig= function(){
      $scope.configuration = "";
      $scope.filename = "";
      $scope.filelocation = '/etc/logstash/conf.d/';
    };

    //function to set the default file location for elastic search files
    /*\etc\elasticsearch*/
    $scope.createElasticConfig = function(){
      $scope.configuration = "";
      $scope.filename = "";
      $scope.filelocation = "/etc/elasticsearch/";
    };

    //Function to send config file data to be saved.
    $scope.saveConfigFile = function()
    {

      if($scope.filename=="")
      {
        alert('you must supply a filename!');
        return;
      }
      var data = "conffilename="+ encodeURIComponent($scope.filelocation+$scope.filename);
      data+= "&conffilecontent=" + encodeURIComponent($scope.configuration);

      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }};

      var result = $http.post(servicelocation+"/UpdateConfFile",data,config)
        .success(function(data)
          {
            console.log(data);
            $scope.configuration = data;

          });

      data = {};

      $http.post(servicelocation+"/GetLogstashConfigDirectoryListing",data,config)
        .success(function(data)
          {
            console.log(data);
             $scope.configfiles=data;
          });
      $http.post(servicelocation+"/GetElasticConfigDirectoryListing",data,config)
        .success(function(data)
          {
            console.log(data);
             $scope.elastic=data;
          });
      $http.post(servicelocation+"/GetCronJobDirectory",data,config)
        .success(function(data)
          {
            console.log(data);
             $scope.cron=data;
          });
    };
  });

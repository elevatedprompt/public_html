'use strict';


/**
 * @ngdoc function
 * @name clientApp.controller:SystemservicesCtrl
 * @description
 * # SystemservicesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')

  .controller('SystemservicesCtrl', function (
    $location,
    $scope,
  //  $parse,
    $http

  ) {
    servicelocation = "https://" + $location.$$host + "/api/";
    servicelocation = "http://192.168.1.96:3000";

    $scope.timezoneoptions =[
    {value:"-12", offset:"-1200", name:"(GMT -12:00) Eniwetok, Kwajalein"},
    {value:"-11", offset:"-1100", name:"(GMT -11:00) Midway Island, Samoa"},
    {value:"-10", offset:"-1000", name:"(GMT -10:00) Hawaii"},
    {value:"-9", offset:"-0900", name:"(GMT -9:00) Alaska"},
    {value:"-8", offset:"-0800", name:"(GMT -8:00) Pacific Time (US & Canada)"},
    {value:"-7", offset:"-0700", name:"(GMT -7:00) Mountain Time (US & Canada)"},
    {value:"-6", offset:"-0600", name:"(GMT -6:00) Central Time (US & Canada), Mexico City"},
    {value:"-5", offset:"-0500", name:"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"},
    {value:"-4.5", offset:"-0450", name:"(GMT -4:30) Caracas"},
    {value:"-4", offset:"-0400", name:"(GMT -4:00) Atlantic Time (Canada), La Paz, Santiago"},
    {value:"-3.5", offset:"-0350", name:"(GMT -3:30) Newfoundland"},
    {value:"-3", offset:"-0300", name:"(GMT -3:00) Brazil, Buenos Aires, Georgetown"},
    {value:"-2", offset:"-0200", name:"(GMT -2:00) Mid-Atlantic"},
    {value:"-1", offset:"-0100", name:"(GMT -1:00 hour) Azores, Cape Verde Islands"},
    {value:"0",  offset:"0000", name:"(GMT) Western Europe Time, London, Lisbon, Casablanca, Greenwich"},
    {value:"1", offset:"+0100", name:"(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris"},
    {value:"2", offset:"+0200", name:"(GMT +2:00) Kaliningrad, South Africa, Cairo"},
    {value:"3", offset:"+0300", name:"(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg"},
    {value:"3.5", offset:"+0350", name:"(GMT +3:30) Tehran"},
    {value:"4",  offset:"+0400", name:"(GMT +4:00) Abu Dhabi, Muscat, Yerevan, Baku, Tbilisi"},
    {value:"4.5", offset:"+0450", name:"(GMT +4:30) Kabul"},
    {value:"5", offset:"+0500", name:"(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"},
    {value:"5.5", offset:"+0550", name:"(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi"},
    {value:"5.75", offset:"+0575", name:"(GMT +5:45) Kathmandu"},
    {value:"6", offset:"+0600", name:"(GMT +6:00) Almaty, Dhaka, Colombo"},
    {value:"6.5", offset:"+0650", name:"(GMT +6:30) Yangon, Cocos Islands"},
    {value:"7", offset:"+0700", name:"(GMT +7:00) Bangkok, Hanoi, Jakarta"},
    {value:"8", offset:"+0800", name:"(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"},
    {value:"9", offset:"+0900", name:"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"},
    {value:"9.5", offset:"+0950", name:"(GMT +9:30) Adelaide, Darwin"},
    {value:"10", offset:"+1000", name:"(GMT +10:00) Eastern Australia, Guam, Vladivostok"},
    {value:"11", offset:"+1100", name:"(GMT +11:00) Magadan, Solomon Islands, New Caledonia"},
    {value:"12", offset:"+1200", name:"(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"}];
    $scope.systemsettings = {};
    $scope.systemsettings.selectedTimezone =  $scope.timezoneoptions[14];

    //TODO: update next line to the current setting for the server.
    $scope.systemsettings.logstashstatusbit = true;
    $scope.systemsettings.kibanastatusbit = true;
    $scope.systemsettings.elasticsearchstatusbit = true;

    $http.post(servicelocation+"/GetTimeZone",data,config)
      .success(function(data)
        {
          $scope.timezoneoptions.forEach(function(zone){
            if(zone.offset==data.trim()){
              $scope.systemsettings.selectedTimezone = zone;
            }
          });
        });

    console.log("Get Service Status")
    var data = "servicename=elasticsearch";
    var config = {headers:{
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    }};
    $http.post(servicelocation+"/GetServiceStatus",data,config)
      .success(function(data)
        {
           $scope.systemsettings.elasticsearchstatus=data;
           //TODO: parse data looking for string.
        });
    $http.post(servicelocation+"/IsServiceRunning",data,config)
      .success(function(data)
        {
           $scope.systemsettings.elasticsearchstatusbit=data;
           //TODO: parse data looking for string.
        });
    data = "servicename=logstash";
    $http.post(servicelocation+"/GetServiceStatus",data,config)
          .success(function(data)
            {
               $scope.systemsettings.logstashstatus=data;
               //TODO: parse data looking for string.
            });
    $http.post(servicelocation+"/IsServiceRunning",data,config)
          .success(function(data)
            {
               $scope.systemsettings.logstashstatusbit=data;
               //TODO: parse data looking for string.
            });
    data = "servicename=kibana4";

    $http.post(servicelocation+"/GetServiceStatus",data,config)
      .success(function(data)
        {
           $scope.systemsettings.kibanastatus=data;
           //TODO: parse data looking for string.
        });
    $http.post(servicelocation+"/IsServiceRunning",data,config)
      .success(function(data)
        {
           $scope.systemsettings.kibanastatusbit=data;
           //TODO: parse data looking for string.
        });

    $scope.saveTimeZone = function() {
      $scope.selectedTimezone = $scope.systemsettings.selectedTimezone;
      var data = "timezoneFromGMT=" + $scope.systemsettings.selectedTimezone.value;
      var config = {headers:{
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        }};

      $http.post(servicelocation+"/UpdateTimeZone",data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
      $http.post(servicelocation+"/GetServiceStatus",data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
    };

    $scope.saveCron = function() {
      //TODO save cron information
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
      $http.post(servicelocation+"/"+method,data,config)
        .success(function(data)
          {
             $scope.systemsettings.elasticsearchstatus=data;
          });
      $http.post(servicelocation+"/GetServiceStatus",data,config)
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
      $http.post(servicelocation+"/"+method,data,config)
        .success(function(data)
          {
             $scope.systemsettings.kibanastatus=data;
          });
      $http.post(servicelocation+"/GetServiceStatus",data,config)
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
      $http.post(servicelocation+"/"+method,data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
      $http.post(servicelocation+"/GetServiceStatus",data,config)
        .success(function(data)
          {
             $scope.systemsettings.logstashstatus=data;
          });
      $scope.systemsettings.logstashstatusbit = !$scope.systemsettings.logstashstatusbit;
      $scope.updateStatus($scope.systemsettings.logstashstatusbit,'logstash');
    };
  });

/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 tutorialWebApp
 */
var servicelocation = "";
var app = angular.module('clientApp', ['ngRoute', 'angular-timezone-selector'])
  .directive('portalFrame', function() {
    return{
      restrict: "E",
         replace: true,
       transclude: true,
    compile: function (scope, element, attrs) {

    }
  }
})
.directive("bootstrapNavbar", function($location) {
   return {
     restrict: "E",
     replace: true,
     transclude: true,
     templateUrl: "components/bootstrapNavbar.html",
     compile: function(element, attrs) {  // (1)
       var li, liElements, links, index, length;

       servicelocation = "https://" + $location.$$host + "/api/"; //Update the service location to that of the host.

       liElements = $(element).find("#js-navbar-collapse li");   // (2)
       for (index = 0, length = liElements.length; index < length; index++) {
         li = liElements[index];
         links = $(li).find("a");  // (3)
         if (links[0].textContent === attrs.currentTab) $(li).addClass("active"); // (4)
       }
     }
   }});
/*Check Service*/
$rootScope.checkService = {};
/*End check serice*/
/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "views/main.html", controller: "MainCtrl"})
    // Pages
    .when('/ConfigFiles', {
      templateUrl: 'views/configfiles.html', controller: 'ConfigfilesCtrl'
    })
    .when('/UserManagement', {
      templateUrl: 'views/usermanagement.html', controller: 'UsermanagementCtrl',
      controllerAs: 'UserManagement'
    })
    .when('/Dashboard', {
      templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl',
      controllerAs: 'Dashboard'
    })
    .when('/HQ', {
      templateUrl: 'views/hq.html', controller: 'HqCtrl',
      controllerAs: 'HQ'
    })
    .when('/systemservices', {
      templateUrl: 'views/systemservices.html', controller: 'SystemservicesCtrl',
      controllerAs: 'systemservices'
    })
    .when('/Notifications', {
      templateUrl: 'views/notifications.html', controller: 'NotificationsCtrl',
      controllerAs: 'systemservices'
    })
    .otherwise("/404", {
      templateUrl: "views/about.html", controller: "AboutCtrl",
      controllerAs:'about'});
}]);

app.controller('MainCtrl', function (){
});
/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

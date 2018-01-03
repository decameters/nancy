var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/about', {
      templateUrl: '/views/templates/about.html',
      controller: 'LoginController as lc',
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/itineraries', {
      templateUrl: '/views/templates/itineraries.html',
      controller: 'ItineraryController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/itinerary-detail', {
      templateUrl: '/views/templates/itinerary-detail.html',
      controller: 'ItineraryController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/contacts', {
      templateUrl: '/views/templates/contacts.html',
      controller: 'ContactController as cc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/lists', {
      templateUrl: '/views/templates/lists.html',
      controller: 'ToDoController as tc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/about-auth', {
      templateUrl: '/views/templates/about-auth.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});

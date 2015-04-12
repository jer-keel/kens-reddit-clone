var app = angular.module("MEAN-Template-Angular", ["ngRoute"]);

// Configure routes for this application
app.config(["$routeProvider", "$locationProvider", 
  function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl: "/html/partials/home.html",
      controller: "HomeController"
    })
    .when("/post/:id", {
      templateUrl: "/html/partials/post.html",
      controller: "PostController"
    })
    .when("/group/:id", {
      templateUrl: "/html/partials/group.html",
      controller: "GroupController"
    })
    .when("/user/:id", {
      templateUrl: "/html/partials/user.html",
      controller: "UserController"
    })
    .otherwise({
      redirectTo: "/"
    });
}]);

// This controll controls the home page!!!
app.controller("HomeController", ["$scope", "$location", "$http",
  function($scope, $location, $http) {
    $scope.groups = [];
    $scope.posts = [];
    $scope.users = [];

    $http.get("/api/g").success(function(data) {
      $scope.groups = data;
    });

    $http.get("/api/p").success(function(data) {
      $scope.posts = data;
    });
  }
]);

app.controller("PostController", ["$scope", "$routeParams", "$http",
  function($scope, $routeParams, $http) {
    $scope.post = {};
    $scope.creator = {};
    $scope.comments = [];

    $http.get("/api/p/id/" + $routeParams.id).success(function(data) {
      $scope.post = data;
      $http.get("/api/m/id/" + $scope.post.owner).success(function(data) {
        $scope.creator = data;
      });
    });

    $http.get("/api/c/postid/" + $routeParams.id).success(function(data) {
      $scope.comments = data;
    });
  }
]);

app.controller("GroupController", ["$scope", "$routeParams", "$http",
  function($scope, $routeParams, $http) {
    $scope.group = {};
    $scope.owner = {};

    $http.get("/api/g/id/" + $routeParams.id).success(function(data) {
      $scope.group = data;
      //console.log(data);
    });

    $http.get("/api/m/username/" + $scope.group.owner).success(function(data) {
      $scope.owner = data;
    });
  }
]);

app.controller("UserController", ["$scope", "$routeParams", "$http", 
  function($scope, $routeParams, $http) {
    $scope.user = {};
    $scope.comments = [];
    $scope.posts = [];

    $http.get("/api/m/id/" + $routeParams.id).success(function(data) {
      $scope.user = data;
    });

    $http.get("/api/p/userid/" + $routeParams.id).success(function(data) {
      $scope.posts = data;
      console.log(data);
    });
  }
]);

// Simple logging to make sure everything loaded correctly
console.log("Angular has been loaded!");
console.log("Test lint");

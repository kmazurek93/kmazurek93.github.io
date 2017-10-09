'use strict';
console.log('loading app.js');
var app = angular.module('main', []);

app.controller('MainController', ['$http', '$scope', function ($http, $scope) {
    $scope.getAge = function () {
        var now = new Date().getTime();
        var bday = new Date(745459200000);
        return Math.abs(now.getYear() - bday.getYear());
    };
    $scope.projects = [];
    $scope.selectedProject = {};
    $scope.constructLink = function(project) {
      return 'https://github.com/kmazurek93/' + project.name;
    };
    $scope.selectProject = function(project) {
        $scope.selectedProject = project;
    };
    $scope.fetchProjects = function () {
        $http.get('json/projects.json')
            .then(function (response) {
                $scope.projects = response.data.sort(function (e1, e2) {
                    var d1 = new Date(e1.date).getTime();
                    var d2 = new Date(e2.date).getTime();
                    return d1 < d2 ? 1 : -1;
                });
            })
            .catch(function () {
            })
    };

    function init() {
        $scope.fetchProjects();
    }

    init();

}]);
console.log('loaded contorller');

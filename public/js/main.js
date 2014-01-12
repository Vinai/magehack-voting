function ProjectsController($scope,$http){

    $http.get('/projects').success(function(projects) {
        $scope.projects = projects;
    });


    $scope.addProject = function() {
        var project = {
            title: $scope.projectTitle,
            description: $scope.projectDescription
        };

        $scope.projects.push(project);

        $http.post('projects', project);
    }
}

function VotesController($scope,$http){

    $http.get('/project/votes/' + $scope.project.id).success(function(votes) {
        $scope.projectVotes = votes;
    });
}
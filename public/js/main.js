'use strict';

var votingApp = angular.module('magehack-voting', []);

votingApp
    .factory('UserFactory', function (VoteFactory, ProjectFactory) {
        var voteFactory = VoteFactory;
        var projectFactory = ProjectFactory;
        
        return function () {
            this.id = '';
            this.name = '';
            this.is_admin = false;
            this.max_votes = 2;
            this.votes = [];
            this.isAuthenticated = function () {
                return this.id != '';
            };
            this.mayVote = function () {
                return this.isAuthenticated() && this.remainingVotes() > 0;
            };
            this.remainingVotes = function () {
                return this.max_votes - this.votes.length;
            };
            this.mayUnVote = function (project) {
                var i;
                for (i = this.votes.length - 1; i >= 0; i--) {
                    if (project.hasVote(this.votes[i])) {
                        return true;
                    }
                }
                return false;
            };
            this.vote = function (project) {
                var vote = false;
                if (this.mayVote()) {
                    vote = new voteFactory(this, project);
                    this.addVote(vote);
                    project.addVote(vote);
                }
                return vote;
            };
            this.unVote = function (project) {
                var i;
                for (i = this.votes.length - 1; i >= 0; i--) {
                    if (project.removeVote(this.votes[i])) {
                        this.votes.splice(i, 1);
                        return true;
                    }
                }
                ;
                return false;
            };
            this.addVote = function (vote) {
                this.votes.push(vote);
            };
            this.mayCreateProject = function () {
                return this.isAuthenticated();
            };
            this.createProject = function () {
                return new projectFactory(this);
            }
        }
    })
    .factory('ProjectFactory', function () {
        return function Project(creator) {
            this.id = '';
            this.creator = creator;
            this.title = '';
            this.description = '';
            this.github = '';
            this.hangout = '';
            this.created_at = new Date();
            this.votes = [];
            this.addVote = function (vote) {
                this.votes.push(vote);
            };
            this.hasVote = function (vote) {
                var idx = this.votes.indexOf(vote);
                return idx + 1;
            };
            this.removeVote = function (vote) {
                var idx = this.votes.indexOf(vote);
                if (idx > -1) {
                    this.votes.splice(idx, 1);
                    return true;
                }
                return false;
            };
            this.isEditable = function (user) {
                if (user.is_admin) {
                    return true;
                }
                return this.creator.id == user.id;
            }
        }
    })
    .factory('VoteFactory', function () {
        return function Vote(user, project, timestamp) {
            this.id = '';
            this.user = user;
            this.project = project;
            this.timestamp = new Date(timestamp);
        }
    })
    .factory('Service', function ($http, ProjectFactory, VoteFactory, UserFactory) {
        var projectFactory = ProjectFactory;
        var voteFactory = VoteFactory;
        var userFactory = UserFactory;
        
        var processResponse = function(response) {
            var result = {};
            if (typeof response.projects != 'undefined') {
                for (var i = 0; i < response.projects.length; i++) {
                    
                }
            }
        }
        
        return {
            authenticateUser: function () {
                // ???
            },
            getProjects: function () {
                var projects
                $http.get('/projects').success(function (projects) {
                    projects = projects;
                });
                projects = this.processResponse(projects);
                return projects;
            },
            createProject: function () {
                
            },
            updateProject: function () {
                
            },
            deleteProject: function () {
                
            },
            createVote: function () {
                
            },
            deleteVote: function () {
                
            }
        }
    })
    .controller('ProjectsController', function ($scope, $http) {

        $http.get('/projects').success(function (projects) {
            $scope.projects = projects;
        });


        $scope.addProject = function () {
            var project = {
                title: $scope.projectTitle,
                description: $scope.projectDescription
            };

            $scope.projects.push(project);

            $http.post('projects', project);
        }
    })
    .controller('VotesController', function ($scope, $http) {

        $http.get('/project/votes/' + $scope.project.id).success(function (votes) {
            $scope.projectVotes = votes;
        });

    })
;
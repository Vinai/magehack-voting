'use strict';

var votingApp = angular.module('magehack-voting', []);
votingApp.value('initData', {});

votingApp
    .directive('mageHackVotesInit', function(initData) {
        return {
            restrict: 'E',
            link: function(scope, elements, attrs) {
                var data = {};
                try {
                    data = eval('(' + elements[0].innerHTML + ')');
                    elements[0].innerHTML = '';
                } catch (e) {}
                angular.extend(initData, data);
            }
        }
    })
    .factory('UserSession', function (UserFactory, initData) {
        var user = new UserFactory();
        angular.extend(user, initData);
        return user;
    })
    .factory('UserFactory', function (VoteFactory, ProjectFactory) {
        var voteFactory = VoteFactory;
        var projectFactory = ProjectFactory;

        return function () {
            this.id = '';
            this.firstname = '';
            this.lastname = '';
            this.github_username = '';
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
            this.addVote = function (vote) {
                this.votes.push(vote);
            };
            this.removeVote = function (vote) {
                var idx = this.votes.indexOf(vote);
                if (idx > -1) {
                    this.votes.splice(idx, 1);
                    return true;
                }
                return false;
            };
            this.mayCreateProject = function () {
                return this.isAuthenticated();
            };
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
    .factory('Service', function ($http, UserSession, ProjectFactory, VoteFactory, UserFactory) {
        var transport = $http;
        var session = UserSession;
        var projectFactory = ProjectFactory;
        var voteFactory = VoteFactory;
        var userFactory = UserFactory;
        var projects = [];
        var users = [];
        var votes = [];

        transport.get('/projects').success(function (response) {
            angular.forEach(response, processResponseProject);
        });

        var removeById = function (list, id) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        var processResponseProject = function (record) {
            var project, user;

            if (user = processResponseUser(record.user)) {
                removeById(projects, record.id);
                project = new projectFactory(user);
                delete record.user;
                angular.extend(project, record);
                project.votes = [];
                projects.push(project);

                angular.forEach(record.votes, processResponseVote);
            }
            return project;
        }

        var processResponseUser = function (record) {
            var user = service.getUserById(record.id);
            if (!user) {
                user = new userFactory();
                angular.extend(user, record);
                users.push(user);
            }
            return user;
        }

        var processResponseVote = function (record) {
            var vote, user, project, timestamp;
            if (typeof record.user != 'undefined') {
                user = processResponseUser(record.user)
            } else if (typeof record.user_id != 'undefined') {
                user = service.getUserById(record.user_id);
            }
            if (user && (project = service.getProjectById(record.project_id))) {
                timestamp = Date.parse(record.created_at.replace(' ', 'T'));
                vote = new voteFactory(user, project, timestamp);
                vote.id = record.id;
                user.addVote(vote);
                project.addVote(vote);
                votes.push(vote);
            }

            return vote;
        }

        var service = {
            projects: projects,
            getUserById: function (user_id) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == user_id) {
                        return users[i];
                    }
                }
                return false;
            },
            getProjectById: function (project_id) {
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].id == project_id) {
                        return projects[i];
                    }
                }
                return false;
            },
            createProject: function (project) {
                if (!session.isAuthenticated() && !session.is_admin) {
                    throw new Error('Not authorized!');
                }
                transport.post('/projects', project)
                    .success(function (response) {
                        processResponseProject(response);
                    })
                    .error(function (response, status) {
                        alert("Error: " + status);
                    });
            },
            updateProject: function (project) {
                if (session.id != project.creator.id && !session.is_admin) {
                    throw new Error('Not authorized!');
                }
                transport.put('/projects/' + project.id, project)
                    .success(function (response) {
                        processResponseProject(response);
                    })
                    .error(function (response, status) {
                        alert("Error: " + status);
                    });
            },
            deleteProject: function (project) {
                var authorized = session.is_admin;
                //authorized = authorized || session.id == project.creator;
                if (!authorized) {
                    throw new Error('Not authorized!');
                }
                transport.delete('/projects/' + project.id, project)
                    .success(function (response) {
                        // todo: check for response.success == true etc...
                        angular.forEach(project.votes, function(vote) {
                            removeById(votes, vote.id);
                            removeById(session.votes, vote.id);
                        });
                        removeById(projects, project.id);
                    })
                    .error(function (response, status) {
                        alert("Error: " + status);
                    });
            },
            createVoteForProject: function (project) {
                if (!session.isAuthenticated()) {
                    throw new Error('Not authorized!');
                }
                if (session.remainingVotes() < 1) {
                    throw new Error('No votes left!');
                }
                transport.post('/votes', {'project-id': project.id})
                    .success(function (response) {
                        processResponseVote(response);
                    })
                    .error(function (response, status) {
                        alert("Error: " + status);
                    });
            },
            deleteVote: function (vote) {
                var authenticated = session.isAuthenticated() && (session.id == vote.user.id);
                //authenticated = authenticated || session.is_admin;
                if (!authenticated) {
                    throw new Error('Not authorized!');
                }
                transport.delete('/votes/' + vote.id)
                    .success(function (response) {
                        // todo: check for response.success == true etc...
                        var project, user;
                        if (project = service.getProjectById(vote.project.id)) {
                            removeById(project.votes, vote.id);
                        }
                        if (user = service.getUserById(vote.user.id)) {
                            removeById(user.votes, vote.id);
                        }
                        removeById(votes, vote.id);
                    })
                    .error(function (response, status) {
                        alert("Error: " + status);
                    });
            }
        };

        return service;
    })
    .controller('ProjectsController', function ($scope, Service) {

        var service = Service;

        $scope.projects = service.projects;

        $scope.addProject = function () {
            service.createProject({
                title: $scope.projectTitle,
                description: $scope.projectDescription,
                github: '',
                hangout: ''
            });
        }
    })
    .controller('VotesController', function ($scope, $http) {

        $http.get('/project/votes/' + $scope.project.id).success(function (votes) {
            $scope.projectVotes = votes;
        });

    })
;
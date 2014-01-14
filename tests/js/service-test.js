describe('The mage hackathon votes service', function () {

    var service, user, project, vote = null;

    // sample response data
    var data_response_project, data_response_vote, data_response_user = '';

    data_response_user = {
        "id": "1",
        "email": "dev@allanmacgregor.com",
        "firstname": "Allan",
        "lastname": "MacGregor",
        "google_accesstoken": "",
        "is_admin": "0",
        "deleted_at": null,
        "created_at": "2014-01-13 22:59:24",
        "updated_at": "2014-01-13 22:59:24",
        "avatar_url": "https:\/\/gravatar.com\/avatar\/b64d0da0dffd4028635446e4cfbc0cee?d=https%3A%2F%2Fidenticons.github.com%2Ff7d739ec183780f498552555c6b5ff57.png&r=x",
        "github_accesstoken": "bfc45da8b286659fef0466201ccf30d21d5bc617",
        "github_username": "amacgregor",
        "level": "beginner"
    }
    data_response_vote = {
        "id": "1",
        "user_id": "1",
        "project_id": "1",
        "created_at": "2014-01-01 00:00:00",
        "updated_at": "2014-01-01 00:00:00"
    };
    data_response_project = {
        "id": "1",
        "creator": "1",
        "title": "The Project Title",
        "description": "The Project Description",
        "github": "https://github.com/magento-hackathon/the-project-name",
        "hangout": "hangout://whatever-this-looks-like",
        "created_at": new Date().getTime(),
        "votes": [ data_response_vote ]
    };

    // init app
    beforeEach(function () {
        module('magehack-voting', function ($provide) {
            user = {
                id: '1234',
                is_admin: false,
                remaining_votes: 2,
                isAuthenticated: function () {
                    return this.id != '';
                },
                remainingVotes: function () {
                    return this.remaining_votes;
                }
            };
            $provide.value('UserSession', user);
        });
    });

    beforeEach(inject(function (Service) {
        service = Service
    }));

    beforeEach(function () {
        project = { creator: user.id };
    });

    beforeEach(function () {
        var voteUser = {};
        var voteProject = {};
        angular.extend(voteUser, user);
        angular.extend(voteProject, project);
        vote = { user: voteUser, project: voteProject };
    });

    it('should have a getProjects resource', function () {
        expect(service.getProjects).toBeDefined();
        expect(typeof service.getProjects).toBe('function');
    });

    it('should have a createProject resource', function () {
        expect(service.createProject).toBeDefined();
        expect(typeof service.createProject).toBe('function');
    });

    it('should have a updateProject resource', function () {
        expect(service.updateProject).toBeDefined();
        expect(typeof service.updateProject).toBe('function');
    });

    it('should have a deleteProject resource', function () {
        expect(service.deleteProject).toBeDefined();
        expect(typeof service.deleteProject).toBe('function');
    });

    it('should have a createVote resource', function () {
        expect(service.createVote).toBeDefined();
        expect(typeof service.createVote).toBe('function');
    });

    it('should have a deleteVote resource', function () {
        expect(service.deleteVote).toBeDefined();
        expect(typeof service.deleteVote).toBe('function');
    });

    it('should have a getUserById resource', function () {
        expect(service.getUserById).toBeDefined();
        expect(typeof service.getUserById).toBe('function');
    });

    it('should have a getProjectById resource', function () {
        expect(service.getProjectById).toBeDefined();
        expect(typeof service.getProjectById).toBe('function');
    });

    it('should allow un-authenticated users to call getProjects', function () {
        user.id = '';
        expect(service.getProjects).not.toThrow(new Error('Not authorized!'));
    });

    it('should not allow un-authenticated users to call createProject', function () {
        user.id = '';
        expect(service.createProject).toThrow(new Error('Not authorized!'));
    });

    it('should allow authenticated users to call createProject', function () {
        expect(service.createProject).not.toThrow(new Error('Not authorized!'));
    });

    it('should allow admins to call createProject', function () {
        user.id = '';
        user.is_admin = true;
        expect(service.createProject).not.toThrow(new Error('Not authorized!'));
    });

    it('should not allow un-authenticated users to call updateProject', function () {
        user.id = '';
        expect(function () {
            service.updateProject(project)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should not allow authenticated users that are not the creator to call updateProject', function () {
        project.creator = user.id + '1';
        expect(function () {
            service.updateProject(project)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should allow authenticated users that are the creator to call updateProject', function () {
        expect(function () {
            service.updateProject(project)
        }).not.toThrow(new Error('Not authorized!'));
    });

    it('should allow admins to call updateProject', function () {
        user.id = '';
        user.is_admin = true;
        expect(function () {
            service.updateProject(project)
        }).not.toThrow(new Error('Not authorized!'));
    });

    it('should not allow un-authenticated users to call deleteProject', function () {
        user.id = '';
        expect(function () {
            service.deleteProject(project)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should not allow authenticated users that are not the creator to call deleteProject', function () {
        project.creator = user.id + '1';
        expect(function () {
            service.deleteProject(project)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should not allow authenticated users that are the creator to call deleteProject', function () {
        expect(function () {
            service.deleteProject(project)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should allow admins to call deleteProject', function () {
        user.id = '';
        user.is_admin = true;
        expect(function () {
            service.deleteProject(project)
        }).not.toThrow(new Error('Not authorized!'));
    });

    it('should not allow un-authenticated users to call createVote', function () {
        user.id = '';
        expect(function () {
            service.createVote(project)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should allow authenticated users who have remaining votes to call createVote', function () {
        expect(function () {
            service.createVote(project)
        }).not.toThrow(new Error('Not authorized!'));
    });

    it('should not allow authenticated users who not have remaining votes to call createVote', function () {
        user.remaining_votes = 0;
        expect(function () {
            service.createVote(project)
        }).toThrow(new Error('No votes left!'));
    });

    it('should not allow un-authenticated users to call deleteVote', function () {
        user.id = '';
        expect(function () {
            service.deleteVote(vote)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should allow authenticated users to delete their own votes by calling deleteVote', function () {
        expect(function () {
            service.deleteVote(vote)
        }).not.toThrow(new Error('Not authorized!'));
    });

    it('should not allow authenticated users to delete other users votes by calling deleteVote', function () {
        vote.user.id = user.id + '1';
        expect(function () {
            service.deleteVote(vote)
        }).toThrow(new Error('Not authorized!'));
    });

    it('should eager load users, projects and votes during initialization', inject(function ($httpBackend) {
        var user, vote, projects, project = null;
        
        var json_response_getProjects = JSON.stringify({
            "projects": [ data_response_project ],
            "users": [ data_response_user ],
            "votes": [ data_response_vote ]
        });
        $httpBackend.expectGET('/projects')
            .respond(200, json_response_getProjects);
        $httpBackend.flush();
        
        user = service.getUserById(data_response_user.id);
        project = service.getProjectById(data_response_project.id);
        projects = service.getProjects();
        expect(projects.length).toBe(1);
        expect(projects[0]).toBe(project);
        expect(project.id).toBe(data_response_project.id);
        expect(project.creator).toBe(data_response_project.creator);
        expect(project.title).toBe(data_response_project.title);
        expect(project.description).toBe(data_response_project.description);
        expect(project.votes.length = data_response_project.votes.length);
        expect(project.votes[0].id = data_response_vote.id);
        expect(project.votes[0].user).toBe(user);
        expect(user.id).toBe(data_response_user.id);
        expect(user.firstname).toBe(data_response_user.firstname);
        expect(user.lastname).toBe(data_response_user.lastname);
    }));
});
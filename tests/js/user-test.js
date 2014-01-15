describe('A mage hackathon participant', function () {

    var user, project = null;

    // init app and stub VoteFactory
    beforeEach(function () {
        module('magehack-voting', function ($provide) {
            var mockedVoteFactory = function () {
                return {};
            };
            $provide.value('VoteFactory', mockedVoteFactory);
            var mockedProjectFactory = function () {
                return {};
            };
            $provide.value('ProjectFactory', mockedProjectFactory);
        })
    });

    // stub User
    beforeEach(inject(function (UserFactory) {
        user = new UserFactory();
        user.id = '1';
        user.github_username = 'test';
        user.voting_enabled = true;
    }));

    // stub Project
    beforeEach(function () {
        project = {
            id: '1',
            creator: angular.extend({}, user),
            addVote: function () {
            },
            removeVote: function () {
            },
            hasVote: function () {
            }
        }
    });

    it('should exist', function () {
        expect(user).toBeDefined();
    });

    it('should have a g+ account', function () {
        expect(user.id).toBeDefined();
        expect(typeof user.id).toBe('string');
    });

    it('should have a firstname', function () {
        expect(user.firstname).toBeDefined();
        expect(typeof user.firstname).toBe('string');
    });

    it('should have a lastname', function () {
        expect(user.lastname).toBeDefined();
        expect(typeof user.lastname).toBe('string');
    });

    it('should have a github_username', function () {
        expect(user.github_username).toBeDefined();
        expect(typeof user.github_username).toBe('string');
    });

    it('should have a is_admin flag', function () {
        expect(user.is_admin).toBeDefined();
        expect(typeof user.is_admin).toBe('boolean');
    });

    it('should have a avatar_url value', function () {
        expect(user.avatar_url).toBeDefined();
        expect(typeof user.avatar_url).toBe('string');
    });

    it('should have zero or more votes', function () {
        expect(user.votes).toBeDefined();
        expect(typeof user.votes).toBe('object');
        expect(user.votes.length).toBeGreaterThan(-0.01);
    });

    it('should have a max_votes larger then zero', function () {
        expect(user.max_votes).toBeDefined();
        expect(typeof user.max_votes).toBe('number');
        expect(user.max_votes).toBeGreaterThan(0);
    });

    it('should have a mayVote method', function () {
        expect(user.isAuthenticated).toBeDefined();
        expect(typeof user.isAuthenticated).toBe('function');
    });

    it('should have a mayVote method', function () {
        expect(user.mayVote).toBeDefined();
        expect(typeof user.mayVote).toBe('function');
    });

    it('should have a remainingVotes method', function () {
        expect(user.remainingVotes).toBeDefined();
        expect(typeof user.remainingVotes).toBe('function');
    });

    it('should have a mayUnvote method', function () {
        expect(user.mayUnvote).toBeDefined();
        expect(typeof user.mayUnvote).toBe('function');
    });

    it('should have a addVote method', function () {
        expect(user.addVote).toBeDefined();
        expect(typeof user.addVote).toBe('function');
    });

    it('should have a mayCreateProject method', function () {
        expect(user.mayCreateProject).toBeDefined();
        expect(typeof user.mayCreateProject).toBe('function');
    });

    it('should have a mayDeleteProject method', function () {
        expect(user.mayDeleteProject).toBeDefined();
        expect(typeof user.mayDeleteProject).toBe('function');
    });

    it('should have a mayEditProject method', function () {
        expect(user.mayEditProject).toBeDefined();
        expect(typeof user.mayEditProject).toBe('function');
    });

    it('should have a voteCountForProject method', function () {
        expect(user.voteCountForProject).toBeDefined();
        expect(typeof user.voteCountForProject).toBe('function');
    });

    it('should be able to vote for a project if remaining vote count > 0', function () {
        expect(user.remainingVotes()).toBeGreaterThan(0);
        expect(user.mayVote()).toBe(true);
    });

    it('should not be able to vote for a project if voting is disabled', function () {
        user.voting_enabled = false;
        expect(user.mayVote()).toBe(false);
    });

    it('should not be able to vote for a project if remaining vote count == 0', function () {
        user.votes = new Array(user.max_votes);

        expect(user.remainingVotes()).toBe(0);
        expect(user.mayVote()).toBe(false);
    });

    it('should decrease the remaining votes by 1 when addVote is called', function () {
        var vote = { id: '1' };
        var remaining_votes_before = user.remainingVotes();
        user.addVote(vote);

        expect(user.remainingVotes()).toBe(remaining_votes_before - 1);
    });

    it('should increase the remaining votes by 1 when removeVote is called', function () {
        var vote = { id: '1' };
        project.removeVote = function () {
            return true;
        }
        user.addVote(vote);
        var remaining_votes_before = user.remainingVotes();

        user.removeVote(vote);
        expect(user.remainingVotes()).toBe(remaining_votes_before + 1);
    });

    it('should be able to take back a vote for a project previously voted for', function () {
        var vote = { id: '1' };
        project.hasVote = function () {
            return true;
        }
        user.addVote(vote);
        expect(user.mayUnvote(project)).toBe(true);
    });

    it('should not be able to take back a vote for a project not previously voted for', function () {
        expect(user.mayUnvote(project)).toBe(false);
    });
    
    it('should return the number of votes from for a project when voteCountForProject is called', function() {
        var vote = { id: '1', project: project };
        var vote_different_project = { id: '2', project: {id: '2'} };

        expect(user.voteCountForProject(project)).toBe(0);
        user.addVote(vote);
        expect(user.voteCountForProject(project)).toBe(1);
        user.addVote(vote_different_project);
        expect(user.voteCountForProject(project)).toBe(1);
    });

    it('should be able to create projects when authenticated', function () {
        expect(user.mayCreateProject()).toBe(true);
    });
    
    it('should be able to delete a project he created when authenticated', function() {
        expect(user.mayDeleteProject(project)).toBe(true);
    });
    
    it('should not be able to delete a project he did not create it', function() {
        project.creator.id = user.id + '1';
        expect(user.mayDeleteProject(project)).toBe(false);
    });
    
    it('should not be able to delete a project if not authenticated', function() {
        user.id = '';
        expect(user.mayDeleteProject(project)).toBe(false);
    });
    
    it('should be able to edit projects he created', function() {
        expect(user.mayEditProject(project)).toBe(true);
    });
    
    it('should not be able to edit projects he did not created', function() {
        project.creator.id = user.id + '1';
        expect(user.mayEditProject(project)).toBe(false);
    });
    
    it('if admin should be able to edit projects he did not created', function() {
        user.is_admin = true;
        
        expect(user.mayEditProject(project)).toBe(true);

        project.creator.id = user.id + '1';
        expect(user.mayEditProject(project)).toBe(true);
    });
    
    it('if not authenticated should not be able to edit projects', function() {
        user.id = '';
        expect(user.mayEditProject(project)).toBe(false);
    });
    
    it('should be able to delete a project if he is an admin', function() {
        project.creator.id = user.id + '1';
        user.is_admin = true;
        expect(user.mayDeleteProject(project)).toBe(true);
    });

    it('should not be able to create projects when not authenticated', function () {
        user.id = ''; // not authenticated
        expect(user.mayCreateProject()).toBe(false);
    });
});
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
        user.id = '12345';
    }));

    // stub Project
    beforeEach(function () {
        project = {
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

    it('should have a vote method', function () {
        expect(user.vote).toBeDefined();
        expect(typeof user.vote).toBe('function');
    });

    it('should have a mayUnVote method', function () {
        expect(user.mayUnVote).toBeDefined();
        expect(typeof user.mayUnVote).toBe('function');
    });

    it('should have a unVote method', function () {
        expect(user.unVote).toBeDefined();
        expect(typeof user.unVote).toBe('function');
    });

    it('should have a addVote method', function () {
        expect(user.addVote).toBeDefined();
        expect(typeof user.addVote).toBe('function');
    });

    it('should have a mayCreateProject method', function () {
        expect(user.mayCreateProject).toBeDefined();
        expect(typeof user.mayCreateProject).toBe('function');
    });

    it('should have a createProject method', function () {
        expect(user.createProject).toBeDefined();
        expect(typeof user.createProject).toBe('function');
    });

    it('should be able to vote for a project if remaining vote count > 0', function () {
        expect(user.remainingVotes()).toBeGreaterThan(0);
        expect(user.mayVote()).toBe(true);
    });

    it('should not be able to vote for a project if remaining vote count == 0', function () {
        user.votes = new Array(user.max_votes);

        expect(user.remainingVotes()).toBe(0);
        expect(user.mayVote()).toBe(false);
    });

    it('should decrease the vote count by 1 when voting', function () {
        var remaining_votes_before = user.remainingVotes();
        user.vote(project);

        expect(user.remainingVotes()).toBe(remaining_votes_before - 1);
    });

    it('should increase the vote count by 1 when taking back a vote', function () {
        project.removeVote = function () {
            return true;
        } // stub function
        user.vote(project);
        var remaining_votes_before = user.remainingVotes();

        user.unVote(project);
        expect(user.remainingVotes()).toBe(remaining_votes_before + 1);
    });

    it('should be able to take back a vote for a project previously voted for', function () {
        project.hasVote = function () {
            return true;
        }
        user.vote(project);
        expect(user.mayUnVote(project)).toBe(true);
    });

    it('should not be able to take back a vote for a project not previously voted for', function () {
        expect(user.mayUnVote(project)).toBe(false);
    });

    it('should be able to create projects when authenticated', function () {
        expect(user.mayCreateProject()).toBe(true);
    });

    it('should not be able to create projects when not authenticated', function () {
        user.id = ''; // not authenticated
        expect(user.mayCreateProject()).toBe(false);
    });
});
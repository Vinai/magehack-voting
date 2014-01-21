describe('A mage hackathon project', function () {

    var project, user, vote = null;

    // init app
    beforeEach(function () {
        module('magehack-voting')
    });
    
    beforeEach(function () {
        user = { id: 1234, is_admin: false }
    });

    beforeEach(inject(function (ProjectFactory) {
        project = new ProjectFactory(user)
    }));

    beforeEach(function () {
        vote = { user: user, project: project }
    });

    it('should have an id', function () {
        expect(project.id).toBeDefined();
        expect(typeof project.id).toBe('string');
    });

    it('should have a creator', function () {
        expect(project.creator).toBeDefined();
        expect(typeof project.creator).toBe('object');
    });

    it('should have a title', function () {
        expect(project.title).toBeDefined();
        expect(typeof project.title).toBe('string');
    });

    it('should have a description', function () {
        expect(project.description).toBeDefined();
        expect(typeof project.description).toBe('string');
    });

    it('should have a github URL', function () {
        expect(project.github_url).toBeDefined();
        expect(typeof project.github_url).toBe('string');
    });

    it('should have a hangout_url', function () {
        expect(project.hangout_url).toBeDefined();
        expect(typeof project.hangout_url).toBe('string');
    });

    it('should have a created-at timestamp', function () {
        expect(project.created_at).toBeDefined();
        expect(typeof project.created_at).toBe('object');
    });

    it('should have zero or more votes', function () {
        expect(project.votes).toBeDefined();
        expect(typeof project.votes).toBe('object');
        expect(project.votes.length).toBeGreaterThan(-0.01);
    });

    it('should have a voteCount method', function () {
        expect(project.voteCount).toBeDefined();
        expect(typeof project.voteCount).toBe('function');
    });

    it('should have a addVote method', function () {
        expect(project.addVote).toBeDefined();
        expect(typeof project.addVote).toBe('function');
    });

    it('should have a hasVote method', function () {
        expect(project.hasVote).toBeDefined();
        expect(typeof project.hasVote).toBe('function');
    });

    it('should have a removeVote method', function () {
        expect(project.removeVote).toBeDefined();
        expect(typeof project.removeVote).toBe('function');
    });

    it('should have one more vote after addVote was called', function () {
        var vote_count_before = project.votes.length;
        project.addVote({});
        expect(project.votes.length).toBe(vote_count_before + 1);
    });

    it('should have one less vote after removeVote was called with an associated vote', function () {
        project.addVote(vote);
        var vote_count_before = project.votes.length;
        project.removeVote(vote);
        expect(project.votes.length).toBe(vote_count_before - 1);
    });

    it('should return true when hasVote is called with an associated vote', function () {
        project.addVote(vote);
        expect(project.hasVote(vote)).toBeTruthy();
    });

    it('should return false when hasVote is called with an non-associated vote', function () {
        vote.user = {};
        expect(project.hasVote(vote)).toBeFalsy();
    });

    it('should have a isValid method', function () {
        expect(project.isValid).toBeDefined();
        expect(typeof project.isValid).toBe('function');
    });

    it('should return true for isValid(\'title\') if the title is longer then 3 characters', function () {
        project.title = '1234';
        expect(project.isValid('title')).toBeTruthy();
    });

    it('should return false for isValid(\'title\') if the title is shorter then 4 characters', function () {
        project.title = '123';
        expect(project.isValid('title')).toBeFalsy();
    });

    it('should return true for isValid(\'description\') if the description is longer then 20 characters', function () {
        project.description = '123456789012345678901';
        expect(project.isValid('description')).toBeTruthy();
    });

    it('should return false for isValid(\'description\') if the description is shorter then 21 characters', function () {
        project.description = '12345678901234567890';
        expect(project.isValid('description')).toBeFalsy();
    });

    it('should return true for isValid() if the description and title are valid', function () {
        project.title = '1234';
        project.description = '123456789012345678901';
        expect(project.isValid()).toBeTruthy();
    });

    it('should return false for isValid() if the description is invalid and title is valid', function () {
        project.title = '1234';
        project.description = '12345678901234567890';
        expect(project.isValid()).toBeFalsy();
    });

    it('should return false for isValid() if the description is valid and title is invalid', function () {
        project.title = '123';
        project.description = '123456789012345678901';
        expect(project.isValid()).toBeFalsy();
    });

    it('should return false for isValid() if the description and title are invalid', function () {
        project.title = '123';
        project.description = '12345678901234567890';
        expect(project.isValid()).toBeFalsy();
    });
    
});
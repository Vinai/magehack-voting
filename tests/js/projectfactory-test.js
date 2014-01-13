describe('A mage hackathon project', function () {

    var project, user, vote = null;

    // init app
    beforeEach(function () {
        module('magehack-voting')
    });
    
    beforeEach(function () {
        user = { gplus: 1234, is_admin: false }
    });

    beforeEach(inject(function (ProjectFactory) {
        project = new ProjectFactory(user)
    }));

    beforeEach(function () {
        vote = { user: user, project: project }
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
        expect(project.github).toBeDefined();
        expect(typeof project.github).toBe('string');
    });

    it('should have a hangout', function () {
        expect(project.hangout).toBeDefined();
        expect(typeof project.hangout).toBe('string');
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

    it('should have a isEditable method', function () {
        expect(project.isEditable).toBeDefined();
        expect(typeof project.isEditable).toBe('function');
    });

    it('should be editable by creator', function () {
        expect(project.isEditable(user)).toBe(true);
    });
    it('should be editable by admin who is not the creator', function () {
        var admin = { is_admin: true, gplus: (user.gplus + 1) };
        expect(project.isEditable(admin)).toBe(true);
    });

    it('should not be editable by a regular user who is not the creator', function () {
        var not_creator = { is_admin: false, gplus: (user.gplus + 1) };
        expect(project.isEditable(not_creator)).toBe(false);
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
});
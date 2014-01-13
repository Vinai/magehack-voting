describe('A mage hackathon vote', function () {

    var vote, user, project = null;

    // init app and stub VoteFactory
    beforeEach(function () {
        module('magehack-voting')
    });

    beforeEach(function () {
        user = {}
    });

    beforeEach(function () {
        project = {}
    });

    beforeEach(inject(function (VoteFactory) {
        vote = new VoteFactory(user, project);
    }));

    it('should have a project', function () {
        expect(vote.project).toBeDefined();
        expect(typeof vote.project).toBe('object');
    });
    
    it('should have a user', function () {
        expect(vote.user).toBeDefined();
        expect(typeof vote.user).toBe('object');
    });
    
    it('should have a timestamp', function () {
        expect(vote.timestamp).toBeDefined();
        expect(typeof vote.timestamp).toBe('object');
    });
});
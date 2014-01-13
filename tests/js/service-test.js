describe('The mage hackathon service', function () {

    var service = null;

    // init app
    beforeEach(function () {
        module('magehack-voting')
    });

    beforeEach(inject(function (Service) {
        service = Service
    }));
    
    it('should have a authenticateUser method', function () {
        expect(service.authenticateUser).toBeDefined();
        expect(typeof service.authenticateUser).toBe('function');
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
    
    if ('should allow non-authorized users to call authenticateUser', function() {});
    if ('should allow authorized users to call createProject', function() {});
    if ('should allow admins to call createProject', function() {});
    
    if ('should allow non-authorized users to call getProjects', function() {});
    if ('should allow authorized users to call createProject', function() {});
    if ('should allow admins to call createProject', function() {});
    
    if ('should not allow non-authorized users to call createProject', function() {});
    if ('should allow authorized users to call createProject', function() {});
    if ('should allow admins to call createProject', function() {});
    
    if ('should not allow non-authorized users to call updateProject', function() {});
    if ('should not allow authorized users that are not the creator to call updateProject', function() {});
    if ('should allow authorized users that are the creator to call updateProject', function() {});
    if ('should allow admins to call updateProject', function() {});
    
    if ('should not allow non-authorized users to call deleteProject', function() {});
    if ('should not allow authorized users that are not the creator to call deleteProject', function() {});
    if ('should not allow authorized users that are the creator to call deleteProject', function() {});
    if ('should allow admins to call deleteProject', function() {});
    
    if ('should not allow non-authorized users to call createVote', function() {});
    if ('should allow authorized users to call createVote', function() {});
    if ('should allow admins to call createVote', function() {});
    
    if ('should not allow non-authorized users to call deleteVote', function() {});
    if ('should allow authorized users to delete their own votes by calling deleteVote', function() {});
    if ('should not allow authorized users to delete other users votes by calling deleteVote', function() {});
    if ('should allow admins to call deleteVote', function() {});
});
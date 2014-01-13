describe('The mage hackathon service', function () {

    var service = null;

    // init app
    beforeEach(function () {
        module('magehack-voting')
    });

    beforeEach(inject(function (Service) {
        service = Service
    }));

    // public
    it('should have a authenticateUser method', function () {
        expect(service.authenticateUser).toBeDefined();
        expect(typeof service.authenticateUser).toBe('function');
    });
    
    it('should have a getUserInfo resource', function () {
        expect(service.getUserInfo).toBeDefined();
        expect(typeof service.getUserInfo).toBe('function');
    });
    
    it('should have a getProjects resource', function () {
        expect(service.getProjects).toBeDefined();
        expect(typeof service.getProjects).toBe('function');
    });

    // authorized users
    it('should have a createProject resource', function () {
        expect(service.createProject).toBeDefined();
        expect(typeof service.createProject).toBe('function');
    });
    
    it('should have a createVote resource', function () {
        expect(service.createVote).toBeDefined();
        expect(typeof service.createVote).toBe('function');
    });
    it('should have a deleteVote resource', function () {
        expect(service.deleteVote).toBeDefined();
        expect(typeof service.deleteVote).toBe('function');
    });

    // creator user + admin
    it('should have a updateProject resource', function () {
        expect(service.updateProject).toBeDefined();
        expect(typeof service.updateProject).toBe('function');
    });

    // admin (TBD: also creators?)
    it('should have a deleteProject resource', function () {
        expect(service.deleteProject).toBeDefined();
        expect(typeof service.deleteProject).toBe('function');
    });
});
describe('The mage hackathon votes user', function () {

    var session, init_data = null;

    // init app
    beforeEach(function () {
        init_data = { id: '1' };
        module('magehack-voting', function ($provide) {
            $provide.value('UserFactory', function() {});
            $provide.value('initData', init_data);
        })
    });

    beforeEach(inject(function (UserSession) {
        session = UserSession;
    }));
    
    it ('should be initialized with the initialization data', function() {
        expect(session.id).toBe(init_data.id);
    });
});
describe('Directive: mage-hack-votes-init', function () {
    var element, scope, init_data, data_init_data;

    data_init_data = {
        id: '1',
        is_admin: false,
        votes: []
    }
    
    beforeEach(function () {
        module('magehack-voting', function($provide) {
            init_data = {};
            $provide.value('initData', init_data);
        });
    });
    
    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element(
            '<mage-hack-votes-init>' +
            JSON.stringify(data_init_data) +
            '</mage-hack-votes-init>'
        );
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();
    }));;
    
    it ('should set the initialization data', function() {
        expect(init_data.id).toBe(data_init_data.id);
        expect(init_data.is_admin).toBe(data_init_data.is_admin);
        expect(typeof init_data.votes).toBe(typeof data_init_data.votes);
        expect(init_data.votes.length).toBe(data_init_data.votes.length);
    });
});
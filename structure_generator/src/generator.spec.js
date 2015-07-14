/* Define dependencies */
var request = require('./request.json');
var Generator = require('./generator');
var assert = require('chai').assert

describe('Generator module', function () {
    describe('#setConnection()', function () {
        var sg = new Generator();

        it('should authenticate with correct data', function () {
            sg.setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW').then(function (resolve) {
                assert.isTrue(true, 'Connection test1 succeed')
            }, function (reject) {
                assert.isTrue(false, 'Connection test1 failed \n' + reject)
            });
        });
        it('should not authenticate with incorrect data', function () {
            sg.setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW').then(function (resolve) {
                assert.isTrue(false, 'Connection test2 failed \n Error was expected.')
            }, function (reject) {
                assert.isTrue(true, 'Connection test2 succeed')
            });
        });
    })
});


//sg.createMeta();
//sg.createModel(request);
//sg.defineEntities(sg.model.namespaces[1].entities);
//sg.sync(true);

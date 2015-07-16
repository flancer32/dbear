/* Define dependencies */
//var request = require('../../sample/01_person/sample_01.dem.json');
var Generator = require('./generate');
var assert = require('chai')

describe('Generator module', function () {
    describe('#setConnection()', function () {
        var sg = new Generator();
        // 1st test
        it('should authenticate with correct data', function () {
            sg.setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW').then(function (resolve) {
                assert.isTrue(true, 'Connection test1 succeed')
            }, function (reject) {
                assert.isTrue(false, 'Connection test1 failed \n' + reject)
            });
        });
        // 2nd test
        it('should not authenticate with incorrect data', function () {
            sg.setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW').then(function (resolve) {
                assert.isTrue(false, 'Connection test2 failed \n Error was expected.')
            }, function (reject) {
                assert.isTrue(true, 'Connection test2 succeed')
            });
            //assert.isTrue(false, 'hi!');
        });
        // wait somehow...

    })
});


//sg.createMeta();
//sg.createModel(request);
//sg.defineEntities(sg.model.namespaces[1].entities);
//sg.synchronize(true);

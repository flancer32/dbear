/* Define dependencies */
//var request = require('../../sample/01_person/sample_01.dem.json');
var Generator = require('./generate');
var assert = require('chai');
var Params = require('./generate/params');

describe('Generator module', function () {
    describe('#setConnection()', function () {
        var sg = new Generator();
        var params = new Params;
        params.dbLogin = 'sample';
        params.dbName = 'sample_sequelize';
        params.dbPass = '3Jcftix7VycNkEYKxIDW';
        // 1st test
        it('should authenticate with correct data', function (done) {
            sg.setConnection(params).then(function (resolve) {
                assert.isTrue(true, 'Connection test1 succeed');
                done()
            }, function (reject) {
                assert.isTrue(false, 'Connection test1 failed \n' + reject)
                done()
            });
        });
        // 2nd test
        //params.dbLogin = 'wrong_login';
        it('should not authenticate with incorrect data', function () {
            sg.setConnection(params).then(function (resolve) {
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

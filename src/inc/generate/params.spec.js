var Params = require('./params');
var should = require('chai').should();

describe('Default params', function() {
    it('should contain default values', function(){
        var params = new Params;
        params.dbLogin.should.equal('login');
        params.dbName.should.equal('sample');
        params.dbPass.should.equal('pass');
        params.dbDialect.should.equal('mysql');
        params.dbHost.should.equal('localhost');
        params.dbearFile.should.equal('');

    })
})
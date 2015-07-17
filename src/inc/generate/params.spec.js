var Params = require('./params');
var should = require('chai').should();

describe('Default params', function() {
    it('should contain default properties', function(){
        var params = new Params;
        params.should.have.property('dbDialect');
        params.should.have.property('dbHost');
        params.should.have.property('dbName');
        params.should.have.property('dbUser');
        params.should.have.property('dbPassword');
        params.should.have.property('demFile');

    })
})
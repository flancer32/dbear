var should = require('chai').should();
var params = require('./params');

describe('Default params', function () {
    it('should contain default properties', function () {
        params.should.have.property('dbDialect');
        params.should.have.property('dbHost');
        params.should.have.property('dbName');
        params.should.have.property('dbUser');
        params.should.have.property('dbPassword');
        params.should.have.property('demFile');

    })
})
'use strict'
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
var readFile = require('./readFile')

describe('readFile', function () {

    it('should read existed file', function (done) {
        readFile('./README.md').should.be.fulfilled.eventually.be.an('object').notify(done);

    })

    it('should throw error when file does not exist', function (done) {
        readFile('./some-file-here').should.be.rejectedWith(Error).notify(done)
    })

})
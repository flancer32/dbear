'use strict'
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
var writeFile = require('./writeFile')

describe('writeFile function', function () {

    it('should write structure to file', function (done) {
        var strJson = JSON.stringify({'id': 'sampleId', 'comment': 'sampleComment'})
        var fileJson = writeFile('./sample/sample.json', strJson)
        fileJson.should.be.fulfilled.notify(done);
    })

    it('should throw error when path does not exist', function (done) {
        return writeFile('./some-path/sample2.json').should.be.rejectedWith(Error).notify(done);
    })
})
'use strict'
/* libraries */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
/* own code */
var Convertor = require('./convert.js')
var params = require('./convert/params')

describe('convert', function () {

    it('should be fulfilled with skipWriteOut param', function (done) {
        var convert = new Convertor()
        params.demFileIn = 'sample/sample.dem.xml'
        params.skipWriteOut = true
        convert.run(params).should.be.fulfilled.notify(done)
    })

    it('should be fulfilled w/o skipWriteOut param', function (done) {
        var convert = new Convertor()
        params.demFileIn = 'sample/sample.dem.xml'
        params.demFileOut = 'sample/sample.dem.json'
        params.skipWriteOut = undefined
        convert.run(params).should.be.fulfilled.notify(done)
    })
})
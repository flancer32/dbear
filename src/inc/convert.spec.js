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

    it('should be rejected with skipWriteOut param, but w/o demFileIn', function (done) {
        var convert = new Convertor()
        params.demFileIn = undefined
        params.skipWriteOut = true
        convert.run(params).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be rejected with skipWriteOut param, but w/o correct path', function (done) {
        var convert = new Convertor()
        params.demFileIn = 'test.xm'
        params.skipWriteOut = true
        convert.run(params).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be fulfilled w/o skipWriteOut param', function (done) {
        var convert = new Convertor()
        params.demFileIn = 'sample/sample.dem.xml'
        params.demFileOut = 'sample/sample.dem.json'
        params.skipWriteOut = undefined
        convert.run(params).should.be.fulfilled.notify(done)
    })

    it('should be rejected w/o demFileIn and demFileOut params, when skipWriteOut = false', function(done) {
        var convert = new Convertor()
        params.demFileIn = undefined
        params.demFileOut = undefined
        params.skipWriteOut = undefined
        convert.run(params).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be rejected with incorrect name or extension of input file, when skipWriteOut = false', function(done) {
        var convert = new Convertor()
        params.demFileIn = 'test.xm'
        params.demFileOut = 'test.json'
        params.skipWriteOut = undefined
        convert.run(params).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be rejected with incorrect name or extension of output file, when skipWriteOut = false', function(done) {
        var convert = new Convertor()
        params.demFileIn = 'test.xml'
        params.demFileOut = 'test.jso'
        params.skipWriteOut = undefined
        convert.run(params).should.be.rejectedWith(console.log()).notify(done)
    })
})
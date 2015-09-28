'use strict'
/* libraries */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
/* own code */
var Convertor = require('./convert.js')

describe('convert', function () {

    it('should be fulfilled with skipWriteOut param', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = 'sample/sample.dem.xml'
        opts.skipWriteOut = true
        convert.run(opts).should.be.fulfilled.notify(done)
    })

    it('should be rejected with skipWriteOut param, but w/o demFileIn', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = undefined
        opts.skipWriteOut = true
        convert.run(opts).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be rejected with skipWriteOut param, but w/o correct path', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = 'test.xm'
        opts.skipWriteOut = true
        convert.run(opts).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be fulfilled w/o skipWriteOut param', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = 'sample/sample.dem.xml'
        opts.demFileOut = 'sample/sample.dem.json'
        opts.skipWriteOut = undefined
        convert.run(opts).should.be.fulfilled.notify(done)
    })

    it('should be rejected w/o demFileIn and demFileOut options, when skipWriteOut = false', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = undefined
        opts.demFileOut = undefined
        opts.skipWriteOut = undefined
        convert.run(opts).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be rejected with incorrect name or extension of input file, when skipWriteOut = false', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = 'test.xm'
        opts.demFileOut = 'test.json'
        opts.skipWriteOut = undefined
        convert.run(opts).should.be.rejectedWith(console.log()).notify(done)
    })

    it('should be rejected with incorrect name or extension of output file, when skipWriteOut = false', function (done) {
        var convert = new Convertor()
        var opts = {}
        opts.opts = 'test.xml'
        opts.demFileOut = 'test.jso'
        opts.skipWriteOut = undefined
        convert.run(opts).should.be.rejectedWith(console.log()).notify(done)
    })
})
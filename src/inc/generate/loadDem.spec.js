'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
require('sinon-as-promised');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should()
var Promise = require('promise')
/* own code */
var Loader = require('./loadDem')


describe('Generator\'s DEM Loader', function () {
    var promise;

    beforeEach(function () {
        //var q1 = sinon.stub
        //var q2 = sinon.stub()
        //var q3 = q1.returnsPromise
        //q3()
        //var q4 = q1.returnsPromise()
        //promise = sinon.stub.returnsPromise()
    })

    it('should be instantiated', function () {
        var loader = new Loader()
        loader.should.be.an('object')
        loader.should.has.property('load')
        loader.load.should.be.a('function')
    })

    it('should throw error when file does not exist', function (done) {
        var loader = new Loader()
        var demFileIn = './some/file/here.xml'
        loader.load(demFileIn).should.be.rejectedWith(Error).notify(done)
    })

    it('should load XML file', function (done) {
        var loader = new Loader()
        var stubReadFile = sinon.stub()
        stubReadFile.resolves(new Buffer('<?xml version="1.0" encoding="UTF-8"?><dBEAR/>'))
        loader.readFile = stubReadFile
        var stubConverterRun = sinon.stub()
        stubConverterRun.resolves({dBEAR: {}})
        loader.converter.run = stubConverterRun
        var demFileIn = './some/file/here.xml'
        loader.load(demFileIn).should.be.fulfilled.then(
            function (json) {
                json.should.be.an('object')
                json.should.have.property('dBEAR')
                done()
            }
        ).catch(done)
    })

    it('should load JSON file', function (done) {
        var loader = new Loader()
        var stubReadFile = sinon.stub()
        stubReadFile.resolves(new Buffer('{"dBEAR": {}}'))
        loader.readFile = stubReadFile
        var stubConverterRun = sinon.stub()
        stubConverterRun.resolves({dBEAR: {}})
        loader.converter.run = stubConverterRun
        var demFileIn = './sample/sample.dem.json'
        loader.load(demFileIn).should.be.fulfilled.then(
            function (json) {
                json.should.be.an('object')
                json.should.have.property('dBEAR')
                done()
            }
        ).catch(done)
    })
})
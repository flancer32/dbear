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
var Model = require('./loadDem')


describe('Generator\'s DEM Loader', function () {

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model()
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
            mod.load.should.be.a('function')
        })

        it('as Function', function () {
            var mod = Model()
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })
    })

    it('should throw error when file does not exist', function (done) {
        var loader = new Model()
        var demFileIn = './some/file/here.xml'
        loader.load(demFileIn).should.be.rejectedWith(Error).notify(done)
    })

    it('should load XML file', function (done) {
        var mod = new Model()
        var stubReadFile = sinon.stub()
        stubReadFile.resolves(new Buffer('<?xml version="1.0" encoding="UTF-8"?><dBEAR/>'))
        mod.readFile = stubReadFile
        var stubConverterRun = sinon.stub()
        stubConverterRun.resolves({dBEAR: {}})
        mod.converter.run = stubConverterRun
        var demFileIn = './some/file/here.xml'
        mod.load(demFileIn).should.be.fulfilled.then(
            function (json) {
                json.should.be.an('object')
                json.should.have.property('dBEAR')
                done()
            }
        ).catch(done)
    })

    it('should load JSON file', function (done) {
        var loader = new Model()
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
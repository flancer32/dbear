/* Define dependencies */
'use strict'
var sinon = require('sinon').sandbox.create()
require('sinon-as-promised');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = require('chai').should()
var Model = require('./generate')

describe('Generator module', function () {

    /* define parameters for all tests */
    var opts = {}

    beforeEach(function () {
        opts.dbName = 'sample'
        opts.dbPassword = 'sample'
        opts.dbHost = 'localhost'
        opts.dbDialect = 'mysql'
        opts.demFile = 'sample/sample.dem.xml'
    })
    opts.dbUser = 'sample'

    describe('should be instantiated', function () {
        it('as Object', function () {
            var mod = new Model(opts)
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })

        it('as Function', function () {
            var mod = Model(opts)
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })
    })

    it('should load DEM from file', function (done) {
        var mod = new Model(opts)
        /* stub Generator attribute 'converter' by the promise that returns the object */
        var stubPromise = sinon.stub()
        stubPromise.resolves({dBEAR: 'is_loaded'})
        mod.converter = {run: stubPromise}
        mod.loadDem().should.be.fulfilled.then(function (res) {
            res.dBEAR.should.be.equal('is_loaded')
            done()
        }).catch(done)
    })

})

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
var Model = require('./mergeDem')


describe('Generator\'s DEM Merger', function () {

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model()
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
            /* API validation */
            mod.merge.should.be.a('function')
        })

        it('as Function', function () {
            var mod = Model()
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })
    })

    it('should merge 2 empty DEMs', function (done) {
        var mod = new Model()
        var dbDem = {dBEAR: {}}
        var loadedDem = {dBEAR: {}}
        var opts = {dbDem: dbDem, loadedDem: loadedDem}
        /* validate promise function */
        mod.merge(opts).should.be.fulfilled.then(
            function (value) {
                value.should.be.an('object')
                done()
            }
        ).catch(done)
    })

})
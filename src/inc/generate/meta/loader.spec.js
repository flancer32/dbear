'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var should = chai.should()
var Sequelize = require('sequelize')
/* own code */
var Model = require('./loader')
var Meta = require('./tables')


describe('META DEM Loader', function () {


    var meta = {}

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model({meta: meta})
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })

        it('as Function', function () {
            var mod = Model({meta: meta})
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })
    })

    /* todo: enable skipped test to create META tables in DB */
    it.skip('should load empty dbDEM', function (done) {
        var mod = new Model({meta: meta})
        sequelize.sync().then(function () {
            mod.load().then(function (dbDEM) {
                dbDEM.should.be.an('object')
                dbDEM.should.have.property('dBEAR')
                dbDEM.dBEAR.should.not.have.property('namespace')
                done()
            })
        }).catch(done)
    })


})
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

    var sequelize = new Sequelize('sample', 'sample', 'sample', {dialect: 'mysql'});
    var meta = new Meta({sequelize: sequelize})

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model({sequelize: sequelize, meta: meta})
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })

        it('as Function', function () {
            var mod = Model({sequelize: sequelize, meta: meta})
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })
    })

    it('should load empty dbDEM', function (done) {
        var mod = new Model({sequelize: sequelize, meta: meta})
        sequelize.sync().then(function () {
            mod.load().then(function (dbDEM) {
                1 + 1
                done()
            })
        }).catch(done)


    })


})
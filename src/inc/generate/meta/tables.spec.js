'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var should = chai.should()
var Sequelize = require('sequelize')
/* own code */
var Model = require('./tables')


describe('META Tables', function () {

    var sequelize = new Sequelize('sample', 'sample', 'sample', {dialect: 'mysql'})

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model()
            mod.should.be.an('object')
            mod.init.should.be.a('function')
        })

        it('as Function', function () {
            var mod = Model()
            mod.should.be.an('object')
        })
    })

    it('should init props', function () {
        var mod = new Model()
        mod.init({sequelize: sequelize})
        mod.orm.should.be.instanceOf(Sequelize)
    })
})
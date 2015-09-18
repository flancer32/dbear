'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var should = chai.should()
var Sequelize = require('sequelize')
/* own code */
var Model = require('./tables')


describe('Meta Tables', function () {

    var sequelize = new Sequelize('sample', 'sample', 'sample', {dialect: 'mysql'});

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model({sequelize: sequelize})
            mod.should.be.an('object')
        })

        it('as Function', function () {
            var mod = Model({sequelize: sequelize})
            mod.should.be.an('object')
        })
    })
})
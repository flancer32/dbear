'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require('chai');
var should = chai.should()
var Sequelize = require('sequelize')
/* own code */
var Model = require('./namespace')


describe('Generator Model Namespace', function () {

    it('should be instantiated', function () {
        var mod = new Model()
        mod.should.be.an('object')
        mod.should.has.property('parseJson')
        mod.parseJson.should.be.a('function')
    })

    it('should process common definition', function () {
        var mod = new Model()
        var json = {
            id:      "nsid",
            alias:   "core",
            comment: "Base namespace for samples."
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('namespace')
        parsed.should.have.property('alias')
        parsed.should.have.property('tables')
        parsed.namespace.should.be.equal('nsid')
        parsed.alias.should.be.equal('core')
        parsed.comment.should.be.equal('Base namespace for samples.')
    })

    it('should process namespace with entities', function () {
        var mod = new Model()
        var json = {
            id:       "nsid",
            entities: [
                {
                    "id":         "Person",
                    "attributes": []
                }
            ]
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('tables')
        parsed.tables.should.be.an('array')
        parsed.tables[0].should.be.an('object')
        parsed.tables[0].table.should.be.equal('Person')
    })
})
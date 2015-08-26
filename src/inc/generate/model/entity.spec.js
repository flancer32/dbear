'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require('chai');
var should = chai.should()
var Sequelize = require('sequelize')
/* own code */
var Model = require('./entity')


describe('Generator Model Entity', function () {

    it('should be instantiated', function () {
        var mod = new Model()
        mod.should.be.an('object')
        mod.should.has.property('parseJson')
        mod.parseJson.should.be.a('function')
    })

    it('should process common definition', function () {
        var mod = new Model()
        var json = {
            id:         "Person",
            alias:      "person",
            comment:    "Person basic entity with 2 attributes.",
            attributes: [
                {id: "Name", type: {text: {}}},
                {id: "Age", type: {integer: {}}},
                {id: "IsHuman", type: {boolean: {}}}
            ]
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('table')
        parsed.should.have.property('columns')
        parsed.should.have.property('options')
        parsed.table.should.be.equal('Person')
        parsed.columns.should.be.an('object')
        parsed.options.should.be.an('object')
    })

    it('should process entity w/o attributes', function () {
        var mod = new Model()
        var json = {id: "Person"}
        var parsed = mod.parseJson(json)
        parsed.should.have.property('table')
        parsed.table.should.be.equal('Person')
    })
})
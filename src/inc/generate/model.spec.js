'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var should = chai.should()
/* own code */
var Model = require('./model')


describe('Generator Model', function () {

    it('should be instantiated', function () {
        var mod = new Model()
        mod.should.be.an('object')
        mod.should.has.property('parseJson')
        mod.parseJson.should.be.a('function')
    })

    it('should process simple JSON', function () {
        var mod = new Model()
        var json = {some: 'objectHere'}
        //mod.parseJson(json)
        //proc.process.should.be.a('function')
    })
})
'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var should = chai.should()
/* own code */
var Processor = require('./processJson')


describe('JSON Processor', function () {

    it('should be instantiated', function () {
        var proc = new Processor({generator: 'is here'})
        proc.should.be.an('object')
        proc.should.has.property('process')
        proc.process.should.be.a('function')
    })

    it('should process simple JSON', function () {
        var proc = new Processor({generator: 'is here'})
        var json = {some: 'objectHere'}
        proc.process(json).then(function (result) {
            1 + 1
        });
        //proc.process.should.be.a('function')
    })
})
'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var should = chai.should()
/* own code */
var Attribute = require('./attribute')


describe('Generator Model Attribute', function () {

    it('should be instantiated', function () {
        var mod = new Attribute()
        mod.should.be.an('object')
        mod.should.has.property('parseJson')
        mod.parseJson.should.be.a('function')
    })

    it('should process simple JSON', function () {
        var mod = new Attribute()
        var json = {id: "fieldName", type: {text: {}}, comment: "comment here"}
        var parsed = mod.parseJson(json)
        parsed.field.should.be.equal('fieldName')
        parsed.type.should.be.equal('VARCHAR(255)')
        //parsed.comment.should.be.equal('comment here')
    })

    it('should process simple JSON', function () {
        var mod = new Attribute()
        var json = {id: "fieldName", type: {text: {}}}
        var parsed = mod.parseJson(json)
        parsed.field.should.be.equal('fieldName')
        parsed.type.should.be.equal('VARCHAR(255)')
    })

})
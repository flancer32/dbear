'use strict'
/* libraries */
var should = require("chai").should()
/* own code */
var _const = require('./constants')
var Parser = require('./namespace')

describe('Namspace parser', function () {

    it('should be instantiated without options', function () {
        var parser = new Parser()
        parser.should.be.an('object')
        parser.should.have.property('_mode')
        parser._mode.should.be.equal(_const.MODE.ASIS)
    })

    it('should be instantiated with options', function () {
        var parser = new Parser({mode: _const.MODE.RICH})
        parser.should.be.an('object')
        parser.should.have.property('_mode')
        parser._mode.should.be.equal(_const.MODE.RICH)
    })

    it('should parse simple sample', function () {
        var parser = new Parser()
        var xmlObj = {
            id:        "com.flancer32.dbear.sample.core",
            alias:     "core",
            comment:   "Base namespace for samples.",
            entities:  {entity: [{id: ''}]},
            relations: {relation: [{id: ''}]}
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('entities')
        jsonObj.should.have.property('relations')
    })

    it('should parse namespace w/o comment', function () {
        var parser = new Parser()
        var xmlObj = {
            id: "com.flancer32.dbear.sample.core"
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
    })

    it('should parse namespace with one entity or relation', function () {
        var parser = new Parser()
        var xmlObj = {
            id:        "com.flancer32.dbear.sample.core",
            entities:  {entity: {id: ''}},
            relations: {relation: {id: ''}}
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('entities')
        jsonObj.should.have.property('relations')
    })

})
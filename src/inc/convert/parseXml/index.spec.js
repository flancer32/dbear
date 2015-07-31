'use strict'
/* libraries */
var should = require('chai').should()
/* own code */
var _const = require('./constants')
var Parser = require('./index')

describe('Index parser', function () {

    it('should be instantiated without options', function () {
        var parser = new Parser()
        parser.should.be.an('object')
        parser.should.have.property('_mode')
        parser._mode.should.be.equal(_const.MODE.ASIS)
    })

    it('should be instantiated with options', function () {
        var parser = new Parser({mode: _const.MODE.CLEAR})
        parser.should.be.an('object')
        parser.should.have.property('_mode')
        parser._mode.should.be.equal(_const.MODE.CLEAR)
    })

    it('should parse simple sample', function () {
        var parser = new Parser()
        var xmlObj = {
            "id":        "IndexId",
            "comment":   "Index Comment",
            "position":  0
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('position')
        jsonObj.position.should.be.equal(0)
    })

    it('should parse index without comment and position', function() {
        var parser = new Parser()
        var xmlObj = {
            "id":        "IndexId"
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
    })
})
'use strict'
/* libraries */
var should = require("chai").should()
/* own code */
var _const = require('./constants')
var Parser = require('./reference')

describe('Reference parser', function () {

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
            "isEntity":  true,
            "id":        "SampleId",
            "alias":     "sampleAlias",
            "comment":   "Authentication method for the Person.",
            "namespace": "sample namespace",
            "indexes":   {
                "index": [
                    {"id": "FirstId", "comment": "First Comment", "position": 0},
                    {"id": "SecondId", "comment": "Second Comment", "position": 1},
                    {"id": "ThirdId", "comment": "Third Comment", "position": 2}
                ]
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('isEntity')
        jsonObj.isEntity.should.be.equal(true)
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('namespace')
        jsonObj.should.have.property('indexes')
    })

    it('should parse reference with one index only', function() {
        var parser = new Parser()
        var xmlObj = {
            "id":        "SampleId",
            "indexes":   {
                "index": {
                    "id": "FirstId", "comment": "First Comment", "position": 0
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('indexes')
    })

    it('should parse reference w/o index', function() {
        var parser = new Parser()
        var xmlObj = {
            "isEntity":  true,
            "id":        "SampleId",
            "alias":     "sampleAlias",
            "comment":   "Authentication method for the Person.",
            "namespace": "sample namespace",
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('isEntity')
        jsonObj.isEntity.should.be.equal(true)
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('namespace')
    })
})
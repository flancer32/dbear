'use strict'
/* libraries */
var should = require("chai").should()
/* own code */
var _const = require('./constants')
var Parser = require('./relation')

describe('Relation parser', function () {

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

    it('should parse simple sample', function() {
        var parser = new Parser()
        var xmlObj = {
            "id":       "SampleId",
            "alias":    "sampleid",
            "comment":  "Sample Comment",
            "refs": {
                "entryRef": [
                    {"id": "FirstId"},
                    {"id": "SecondId"},
                    {"id": "ThirdId"}
                ]
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('refs')
    })

    it('should parse relation with one reference', function() {
        var parser = new Parser()
        var xmlObj = {
            "id":       "SampleId",
            "refs": {
                "entryRef": {"id": "SampleId"}
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('refs')
    })
})
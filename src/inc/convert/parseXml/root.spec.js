'use strict'
/* libraries */
var should = require("chai").should()
/* own code */
var _const = require('./constants')
var Parser = require('./root')

describe('Root parser', function () {

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
            "dBEAR": {
                "comment":   "Second iteration in the domain data development.",
                "namespaces":  {
                    "namespace": [
                        {"id": "com.flancer32.dbear.sample.core"},
                        {"id": "com.flancer32.dbear.sample.auth"}
                    ]
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('dBEAR')
        jsonObj.dBEAR.should.have.property('comment')
        jsonObj.dBEAR.should.have.property('namespaces')
    })

    it('should parse with one namespace', function() {
        var parser = new Parser()
        var xmlObj = {
            "dBEAR": {
                "comment":   "Second iteration in the domain data development.",
                "namespaces":  {
                    "namespace": {
                        "id": "com.flancer32.dbear.sample.core"
                    }
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('dBEAR')
        jsonObj.dBEAR.should.have.property('comment')
        jsonObj.dBEAR.should.have.property('namespaces')
    })

    it('should parse w/o comment', function () {
        var parser = new Parser()
        var xmlObj = {
            "dBEAR": {
                "namespaces":  {
                    "namespace": {
                        "id": "com.flancer32.dbear.sample.core"
                    }
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('dBEAR')
        jsonObj.dBEAR.should.not.have.property('comment')
        jsonObj.dBEAR.should.have.property('namespaces')
    })
})
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
    })

    it('should be instantiated with options', function () {
        var parser = new Parser({mode: _const.MODE.NORMAL})
        parser.should.be.an('object')
        parser.should.have.property('_mode')
        parser._mode.should.be.equal(_const.MODE.NORMAL)
    })

    it('should parse simple sample', function () {
        var parser = new Parser()
        var xmlObj = {
            comment:   "Authentication method for the Person.",
            namespace: "sample namespace",
            id:        "SampleId",
            alias:     "sampleAlias",
            indexes:   [{id: "IndexId", comment: "Index Comment", position: 0}]
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
    })
})
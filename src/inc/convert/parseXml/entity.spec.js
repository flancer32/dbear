'use strict'
/* libraries */
var should = require("chai").should()
/* own code */
var _const = require('./constants')
var Parser = require('./entity')

describe('entity parser', function () {

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
            "id":         "Person",
            "comment":    "Person basic entity with 2 attributes.",
            "attributes": {
                "attribute": [
                    {"id": "NameFirst", "type": {"text": {}}},
                    {"id": "NameLast", "type": {"text": {}}},
                    {"id": "Gender", "type": {"text": {"isNullable": "false", "isUnique": "false", "length": "1"}}}
                ]
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('attributes')
    })

    it('should parse entity with one attribute only', function () {
        var parser = new Parser()
        var xmlObj = {
            "id":         "Person",
            "attributes": {
                "attribute": {"id": "NameFirst", "type": {"text": {}}}
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('attributes')
    })

    it('should parse entity w/o comment and attributes', function () {
        var parser = new Parser()
        var xmlObj = {
            "id":         "Person"
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('attributes')
    })

})
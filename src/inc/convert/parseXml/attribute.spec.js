'use strict'
/* libraries */
var should = require("chai").should()
/* own code */
var _const = require('./constants')
var Parser = require('./attribute')

describe('Attribute parser', function () {

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
            "id": "NameFirst",
            "alias": "nfirst",
            "comment": "Comment is here",
            "type": {},
            "indexes": {
                "index": [
                    {"id": "FirstId", "comment": "First Comment", "position": 0},
                    {"id": "SecondId", "comment": "Second Comment", "position": 1},
                    {"id": "ThirdId", "comment": "Third Comment", "position": 2}
                ]
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('type')
        jsonObj.should.have.property('indexes')
    })

    it('should parse binary type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "binary": {}
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('binary')
    })

    it('should parse boolean type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "boolean": {}
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('boolean')
    })

    it('should parse datetime type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "datetime": {}
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('datetime')
    })

    it('should parse integer type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "integer": {
                    "isUnsigned": false,
                    "isAutoincrement": false
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('integer')
        jsonObj.type.integer.should.have.property('isUnsigned')
        jsonObj.type.integer.should.have.property('isAutoincrement')
    })

    it('should parse numeric type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "numeric": {
                    "isUnsigned": false,
                    "precision": 16,
                    "scale": 4
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('numeric')
        jsonObj.type.numeric.should.have.property('isUnsigned')
        jsonObj.type.numeric.should.have.property('precision')
        jsonObj.type.numeric.should.have.property('scale')
    })

    it('should parse option type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "option": {}
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('option')
    })

    it('should parse text type attribute', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {
                "text": {
                    "length": 255
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.type.should.have.property('text')
        jsonObj.type.text.should.have.property('length')
    })

    it('should parse attribute with one index only', function () {
        var parser = new Parser()
        var xmlObj = {
            "id": "NameFirst",
            "type": {},
            "indexes": {
                "index": {
                    "id": "FirstId", "comment": "First Comment", "position": 0
                }
            }
        }
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('type')
        jsonObj.should.have.property('indexes')
    })

    it('should parse object w/o index', function () {
        var parser = new Parser()
        var xmlObj = {"id": "NameFirst", "alias": "nfirst", "comment": "Comment is here", "type": {}}
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('type')
        jsonObj.should.not.have.property('indexes')
    })

})
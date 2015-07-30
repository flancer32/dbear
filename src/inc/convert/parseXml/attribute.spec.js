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
        var xmlObj = {'id': 'NameFirst', 'alias': 'nfirst', 'type': {}, 'comment': 'Comment is here'}
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.have.property('id')
        jsonObj.should.have.property('alias')
        jsonObj.should.have.property('comment')
        jsonObj.should.have.property('type')
    })

    it('should parse object w/o comment', function () {
        var parser = new Parser()
        var xmlObj = {'id': 'NameFirst', 'alias': 'nfirst', 'type': {}}
        var jsonObj = parser.parse(xmlObj)
        jsonObj.should.be.an('object')
        jsonObj.should.not.have.property('comment')
    })

})
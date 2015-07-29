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
    })

    it('should be instantiated with options', function () {
        var parser = new Parser({mode: _const.MODE.NORMAL})
        parser.should.be.an('object')
        parser.should.have.property('_mode')
        parser._mode.should.be.equal(_const.MODE.NORMAL)
    })


})
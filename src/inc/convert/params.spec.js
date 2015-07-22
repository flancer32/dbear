'use strict'
var should = require('chai').should()
var params = require('./params')

describe('Default params', function () {
    it('should contain default properties', function () {
        params.should.have.property('demFileIn')
        params.should.have.property('demFileOut')

    })
})
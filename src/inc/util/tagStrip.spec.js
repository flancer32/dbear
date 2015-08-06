'use strict'
/* libraries */
var should = require("chai").should();
/* own code */
var strip = require('./tagStrip')

describe('#tagStrip()', function () {
    it('should strip tag prefix', function () {
        return strip('tns:dBEAR').should.be.equal('dBEAR')
    })
})
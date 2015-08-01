'use strict'
/* libraries */
var should = require("chai").should();
/* own code */
var strip = require('./tagStrip')

describe('#tagStrip()', function () {
    it('should strip tag prefix', function () {
        var node = strip('tns:dBEAR')
        node.should.be.equal('dBEAR')
    })
})
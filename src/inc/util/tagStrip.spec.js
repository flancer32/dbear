'use strict'
/* libraries */
var should = require("chai").should();
/* own code */
var Strip = require('./tagStrip')

describe('#tagStrip()', function () {
    it('should strip tag prefix', function () {
        var strip = new Strip()
        var node = strip.tagStrip('tns:dBEAR')
        node.should.have.property('dBEAR')
    })
})
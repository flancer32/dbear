'use strict'
/* libraries */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
/* own code */
var Convertor = require('./convert.js')

describe('convert', function () {
    describe('#someFunc()', function () {
        var convert = new Convertor()
        it('should be fulfilled with right parameters', function (done) {
            var params = require('./convert/params')
            params.demFileIn = 'sample/sample.dem.xml'
            params.skipWriteOut = true
            convert.run(params).should.be.fulfilled.notify(done)
        })
    })
})
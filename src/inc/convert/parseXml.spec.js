'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var should = chai.should()
/* own code */
var Parser = require('./parseXml')

chai.use(chaiAsPromised);

describe('ParseXML file', function() {
    it('should throw error if data is incorrect', function (done) {
        var stub = sinon.stub().throws()
        Parser(stub).should.be.rejectedWith(Error).notify(done)
    })
})

//describe('readFile', function () {
//
//    it('should throw error on file not exist', function () {
//        return parser('./README.md').should.be.fulfilled;
//
//    })
//
//    it('should throw error when file does not exist', function () {
//        //readFile.should.be.a('string')
//        return parser('./some-file-here').should.be.rejectedWith(Error)
//    })
//
//})
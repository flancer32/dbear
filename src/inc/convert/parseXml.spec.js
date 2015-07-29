'use strict'
/* libraries */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var should = chai.should()
/* own code */
var parseXml = require('./parseXml')

chai.use(chaiAsPromised);

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
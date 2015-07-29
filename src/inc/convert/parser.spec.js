'use strict'
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
var parser = require('./parser')

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
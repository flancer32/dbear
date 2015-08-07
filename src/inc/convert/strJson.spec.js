'use strict'
/* libraries */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should()
/* own code */
var stringJson = require('./strJs')

describe('strJson function', function () {
    it('should stringify simple JSON structure', function () {
        var objJson = stringJson({dBEAR: {}})
        objJson.should.be.an('object')
    })
})
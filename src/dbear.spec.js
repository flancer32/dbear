var assert = require('chai').assert
var program = require('./dbear.js')

describe('#program', function () {
    it('should be a Command object', function () {
        assert.equal('object', typeof  program)
        assert.equal('Command', program.constructor.name)
    })
    it('version should be 0.0.1', function () {
        assert.equal('0.0.1', program.version())
    })
})
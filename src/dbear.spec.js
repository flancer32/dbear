var assert = require('chai').assert
var should = require('chai').should()
var program = require('./dbear.js')

describe('#program', function () {
    it('should be a Command object', function () {
        assert.equal('object', typeof  program)
        assert.equal('Command', program.constructor.name)
    })

    it('version should be 0.1.0', function () {
        assert.equal('0.1.0', program.version())
    })

    it('should define available commands', function () {
        // TODO use one of the 'assert' or 'should'
        program.parse(['node', 'dbear.js'])
        program.commands[0].name().should.equal('validate')
        program.commands[1].name().should.equal('convert')
        program.commands[2].name().should.equal('generate')
        program.commands[3].name().should.equal('analyze')
    })
})



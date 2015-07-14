var assert = require('chai').assert
var mod = require('./generate.js')

describe('generate', function () {
    describe('#someFunc()', function () {
        it('should return 3 when the value is not present', function () {
            assert.equal(3, mod())
        })
        it('should return 3 when the value is any', function () {
            assert.equal(3, mod(1))
            assert.equal(3, mod('a'))
        })
    })
})
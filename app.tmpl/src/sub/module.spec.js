var assert = require('chai').assert
var mod = require('./module.js')

describe('Applpication module', function () {
    describe('#mod()', function () {
        it('should return Nan when the value is not present', function () {
            assert.ok(isNaN(mod()))
        })
        it('should return 5 when the value is 3', function () {
            assert.equal(5, mod(3))
        })
    })
})
/**
 * Created by Victor on 24-Jul-15.
 */

var meta = require('./meta')
var should = require('chai').should()
var sinon = require('sinon')

function Entity() {
    this.callCount1 = 0
    this.hasMany = function () {
        this.callCount1++
        /* TODO Add assertions here
         * #Created on 24-Jul-15
         * */
    }
}

function Dummy() {
    this.callCount = 0
    this.define = function () {
        this.callCount++
        sinon.spy()
        return new Entity()
    }
}
describe('Meta', function () {
    describe('createMeta()', function () {
        it('should call define() method', function () {
            dummy = new Dummy()
            meta.createMeta(dummy).then(function () {
            }, function (reject) {
                console.log(reject);
            })
            dummy.callCount.should.equal(4)
        })
    })
})
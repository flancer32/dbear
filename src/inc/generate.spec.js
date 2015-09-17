/* Define dependencies */
'use strict'
var sinon = require('sinon').sandbox.create()
var should = require('chai').should()
var Promise = require('Promise')
var Generator = require('./generate')
var params = require('./generate/params')


describe('Generator module', function () {

    /* define parameters for all tests */
    params.dbUser = 'sample'
    params.dbName = 'sample'
    params.dbPassword = 'sample'
    params.dbHost = 'localhost'
    params.dbDialect = 'mysql'
    params.demFile = 'sample/sample.dem.xml'

    describe('#setConnection()', function () {

        // 1st test
        it('should authenticate with correct data', function (done) {
            var sg = new Generator(params)
            sinon.stub(sg, 'getOrm', function () {
                return function (database, username, password, options) {
                    database.should.equal(params.dbName)
                    username.should.equal(params.dbUser)
                    password.should.equal(params.dbPassword)
                    this.authenticate = function () {
                        return new Promise(function (resolve, reject) {
                            resolve()
                        })
                    }
                }
            })
            /* TODO fix it! Should we close opened connection?????*/
            sg.setConnection(params).then(function (resolve) {
                console.log("Ok!")
                resolve.should.equal("Connection established")
                done()
            }, function (err) {
                console.log("Something bad happened")
                /* done() will be not called, if this should is rejected */
                '2'.should.equal('3')
                done(err)
            })

        })
    })

    describe('#run', function () {
        it.only('should start with simple data', function () {
            params.demFile = 'sample/sample.dem.xml'
            var sg = new Generator(params)
            sg.run()//.then(done).catch(done)
        })
    })
})

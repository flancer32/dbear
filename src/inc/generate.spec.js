/* Define dependencies */
'use strict'
var sinon = require('sinon').sandbox.create()
var should = require('chai').should()
var Promise = require('Promise')
var Generator = require('./generate')
var opts = require('./generate/params')


describe('Generator module', function () {

    /* define parameters for all tests */
    opts.dbUser = 'sample'
    opts.dbName = 'sample'
    opts.dbPassword = 'sample'
    opts.dbHost = 'localhost'
    opts.dbDialect = 'mysql'
    opts.demFile = 'sample/sample.dem.xml'

    describe('#setConnection()', function () {

        // 1st test
        it.skip('should authenticate with correct data', function (done) {
            var sg = new Generator(opts)
            sinon.stub(sg, 'getOrm', function () {
                return function (database, username, password, options) {
                    database.should.equal(opts.dbName)
                    username.should.equal(opts.dbUser)
                    password.should.equal(opts.dbPassword)
                    this.authenticate = function () {
                        return new Promise(function (resolve, reject) {
                            resolve()
                        })
                    }
                }
            })
            /* TODO fix it! Should we close opened connection?????*/
            sg.setConnection(opts).then(function (resolve) {
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
        it('should start with simple data', function (done) {
            opts.demFile = 'sample/sample.dem.xml'
            var sg = new Generator(opts)
            sg.run().then(done).catch(done)
        })
    })
})

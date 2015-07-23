/* Define dependencies */
'use strict'
var sinon = require('sinon').sandbox.create()
var should = require('chai').should()
var assert = require('chai')
var Promise = require('Promise')
var Generator = require('./generate')
var params = require('./generate/params')


describe('Generator module', function () {
    describe('#setConnection()', function () {
        var sg = new Generator()

        params.dbUser = 'sample'
        params.dbName = 'sample_sequelize'
        params.dbPassword = '3Jcftix7VycNkEYKxIDW'
        params.dbHost = 'localhost'
        params.dbDialect = 'mysql'
        // 1st test
        it('should authenticate with correct data', function (done) {
            sinon.stub(sg, 'getOrm', function () {
                return function (database, username, password, options) {
                    this.authenticate = function () {
                        database.should.equal(params.dbName)
                        username.should.equal(params.dbUser)
                        password.should.equal(params.dbPassword)
                        return new Promise(function (resolve, reject) {
                            resolve()
                        })
                    }
                }
            })
            /* TODO fix it! Should we close opened connection?????*/
            sg.setConnection(params).then(function () {
                console.log("Ok!")
                assert.isTrue(true)
                done()
            }, function (err) {
                console.log("Something bad happened")
                done(err)
            })

        })
    })
})


//sg.createMeta();
//sg.createModel(request);
//sg.defineEntities(sg.model.namespaces[1].entities);
//sg.synchronize(true);

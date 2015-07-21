/* Define dependencies */
//var request = require('../../sample/01_person/sample_01.dem.json');
var Generator = require('./generate')
var params = require('./generate/params')
var sinon = require('sinon').sandbox.create()
var should = require('chai').should()
var assert = require('chai')

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
                    this.db = database
                    this.password = password
                    this.username = username
                    this.authenticate = function () {
                        return new Promise(function (resolve, reject) {
                            /* validate params */
                            console.log("database - " + database)
                            console.log("Username - " + username)
                            console.log("password - " + password)
                            database.should.equal(params.dbName + 1)
                            username.should.equal(params.dbUser)
                            password.should.equal(params.dbPassword)
                            resolve()
                        })
                    }
                }
            })
            /* TODO fix it!*/
            sg.setConnection(params).then(function () {
                console.log("Ok!")
                assert.isTrue(true)
            }, function () {
                console.log("Something bad happened")
                assert.isTrue(false)
            })
            done()
        })
    })
})


//sg.createMeta();
//sg.createModel(request);
//sg.defineEntities(sg.model.namespaces[1].entities);
//sg.synchronize(true);

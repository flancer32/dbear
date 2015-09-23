'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
require('sinon-as-promised');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should()
/* own code */
var Model = require('./namespace')


describe('Namespace META Loader', function () {

    var meta = {}
    var dbDEM = {dBEAR: {}}
    var cache = {namespace: {}, entity: {}, relation: {}}

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model({
                table:  meta.namespace,
                dbDEM: dbDEM,
                cache: cache
            })
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })

        it('as Function', function () {
            var mod = Model({
                table:  meta.namespace,
                dbDEM: dbDEM,
                cache: cache
            })
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })

    })

    it('should process empty META data', function (done) {
        var dbDEM = {dBEAR: {}}
        var cache = {namespace: {}, entity: {}, relation: {}}
        var namespace = {}
        /* stub namespace.all promise function */
        var stubMetaAll = sinon.stub()
        stubMetaAll.resolves([])
        namespace.all = stubMetaAll
        var mod = new Model({
            table:  namespace,
            dbDEM: dbDEM,
            cache: cache
        })
        mod.load().should.be.fulfilled.then(function () {
            dbDEM.dBEAR.should.not.have.property('namespaces')
            done()
        }).catch(done)
    })

    it('should create namespace nodes in dbDEM', function (done) {
        var dbDEM = {dBEAR: {}}
        var cache = {namespace: {}, entity: {}, relation: {}}
        var namespace = {}
        /* stub namespace.all promise function */
        var stubMetaAll = sinon.stub()
        stubMetaAll.resolves([
            {id: 1, name: 'tequila.core', alias: 'core', comment: 'Teq comment'}
        ])
        namespace.all = stubMetaAll
        var mod = new Model({
            table: namespace,
            dbDEM: dbDEM,
            cache: cache
        })
        mod.load().should.be.fulfilled.then(function () {
            dbDEM.dBEAR.namespaces['tequila.core'].id.should.be.equal('tequila.core')
            dbDEM.dBEAR.namespaces['tequila.core'].comment.should.be.equal('Teq comment')
            dbDEM.dBEAR.namespaces['tequila.core'].alias.should.be.equal('core')
            dbDEM.dBEAR.namespaces['tequila.core'].entities.should.be.an('object')
            dbDEM.dBEAR.namespaces['tequila.core'].relations.should.be.an('object')
            done()
        }).catch(done)
    })

})
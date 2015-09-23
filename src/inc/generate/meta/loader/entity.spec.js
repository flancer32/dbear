'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
require('sinon-as-promised');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should()
/* own code */
var Model = require('./entity')


describe('Entity META Loader', function () {

    var meta = {entity: {}}
    var dbDEM = {dBEAR: {}}
    var cache = {namespace: {}, entity: {}, relation: {}}

    describe('should be instantiated', function () {

        it('as Object', function () {
            var mod = new Model({
                table: meta.entity,
                dbDEM: dbDEM,
                cache: cache
            })
            mod.should.be.an('object')
            mod.should.be.an.instanceOf(Model)
        })

        it('as Function', function () {
            var mod = Model({
                table: meta.namespace,
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
            table: namespace,
            dbDEM: dbDEM,
            cache: cache
        })
        mod.load().should.be.fulfilled.then(function () {
            dbDEM.dBEAR.should.not.have.property('namespaces')
            done()
        }).catch(done)
    })

    it('should create enti nodes in dbDEM', function (done) {
        var dbDEM = {dBEAR: {namespaces: {ns1: {entities: {}}}}}
        var cache = {namespace: {1: {name: 'ns1'}}, entity: {}, relation: {}}
        var namespace = {}
        /* stub namespace.all promise function: return one _entity entry */
        var stubMetaAll = sinon.stub()
        stubMetaAll.resolves([
            {id: 1, name: 'Person', namespace_id: 1, alias: 'person', comment: 'Person Entity'}
        ])
        namespace.all = stubMetaAll
        var mod = new Model({
            table: namespace,
            dbDEM: dbDEM,
            cache: cache
        })
        mod.load().should.be.fulfilled.then(function () {
            dbDEM.dBEAR.namespaces.ns1.entities['Person'].id.should.be.equal('Person')
            dbDEM.dBEAR.namespaces.ns1.entities['Person'].comment.should.be.equal('Person Entity')
            dbDEM.dBEAR.namespaces.ns1.entities['Person'].alias.should.be.equal('person')
            dbDEM.dBEAR.namespaces.ns1.entities['Person'].attributes.should.be.an('object')
            done()
        }).catch(done)
    })

})
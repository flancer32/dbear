'use strict'
var should = require('chai').should()
var sinon = require('sinon').sandbox.create()
var dbear = require('./dbear.js')
var Generator = require('./inc/generate')
var Converter = require('./inc/convert')
var generator = new Generator()
var converter = new Converter()

describe('#dbear', function () {
    it('should be a Command object', function () {
        (typeof  dbear).should.be.equal('object')
        dbear.constructor.name.should.be.equal('Command')
    })

    it('version should be 0.1.0', function () {
        dbear.version().should.be.equal('0.1.0')
    })

    it('should define available commands', function () {
        //dbear.parse([])
        dbear.commands[0].name().should.equal('validate')
        dbear.commands[1].name().should.equal('convert')
        dbear.commands[2].name().should.equal('generate')
        dbear.commands[3].name().should.equal('analyze')
    })

    it('should define available options', function () {
        var i = 0
        dbear.options[i++].flags.should.equal('-V, --version')
        dbear.options[i++].flags.should.equal('-d, --db-dialect [value]')
        dbear.options[i++].flags.should.equal('-H, --db-host [value]')
        dbear.options[i++].flags.should.equal('-n, --db-name [value]')
        dbear.options[i++].flags.should.equal('-u, --db-user [value]')
        dbear.options[i++].flags.should.equal('-p, --db-password [value]')
        dbear.options[i++].flags.should.equal('-i, --in [value]')
        dbear.options[i++].flags.should.equal('-o, --out [value]')
    })

    it('should perform validation', function () {
        sinon.stub(process, 'exit');
        sinon.stub(process.stdout, 'write');
        dbear.parse(['node', 'dbear', '-i', 'input_file', 'validate'])
        var output = process.stdout.write.args[0];
        output[0].should.contain([
            'validate is here'
        ].join('\n'));
        sinon.restore();
    })

    it('should perform conversation', function () {
        sinon.stub(converter, 'run', function (params) {
            params.demFileIn.should.contain('input_file')
            params.demFileOut.should.contain('output_file')
        })
        dbear.converter = converter
        dbear.parse(['node', 'dbear', '-i', 'input_file', '-o', 'output_file', 'convert'])
    })

    describe('should perform generation', function () {

        it('with default parameters (except input file)', function () {
            sinon.stub(generator, 'run', function (params) {
                params.dbDialect.should.equal('mariadb')
                params.dbHost.should.equal('localhost')
                params.dbName.should.equal('sample')
                params.dbUser.should.equal('sample')
                params.dbPassword.should.equal('sample')
                params.demFile.should.contain('input_file')
            })
            dbear.generator = generator
            dbear.parse(['node', 'dbear', '-i', 'input_file', 'generate'])
        })

    })

    it('should perform analyze', function () {
        dbear.parse(['node', 'dbear', '-i', 'input_file', 'analyze'])
    })

})

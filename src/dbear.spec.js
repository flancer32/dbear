var should = require('chai').should()
var sinon = require('sinon').sandbox.create()
var dbear = require('./dbear.js')

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
        dbear.options[i++].flags.should.equal('-i, --in [value]')
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
        dbear.parse(['node', 'dbear', '-i', 'input_file', 'convert'])
    })

    it('should perform generation', function () {
        dbear.parse(['node', 'dbear', '-i', 'input_file', 'generate'])
    })

    it('should perform analyze', function () {
        dbear.parse(['node', 'dbear', '-i', 'input_file', 'analyze'])
    })

})

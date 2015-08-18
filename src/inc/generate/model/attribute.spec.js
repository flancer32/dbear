'use strict'
/* libraries */
var sinon = require('sinon').sandbox.create()
var chai = require("chai");
var should = chai.should()
var Sequelize = require('sequelize')
/* own code */
var Model = require('./attribute')


describe('Generator Model Attribute', function () {

    it('should be instantiated', function () {
        var mod = new Model()
        mod.should.be.an('object')
        mod.should.has.property('parseJson')
        mod.parseJson.should.be.a('function')
    })

    it('should process common definition', function () {
        var mod = new Model()
        var json = {
            id:      "fieldName",
            comment: "comment here",
            type:    {
                text: {
                    isPrimaryKey: false,
                    defaultValue: "some string",
                    isNullable:   true,
                    isUnique:     false
                }
            },
            indexes: [
                {
                    id:       "NameOfTheIndex",
                    comment:  "This field is included into index 'NameOfTheIndex' on second position.",
                    position: 2
                }
            ]
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('column')
        parsed.should.have.property('definition')
        parsed.column.should.be.equal('fieldName')
        parsed.definition.should.be.an('object')
        var def = parsed.definition
        def.should.have.property('field')
        def.should.have.property('comment')
        def.should.have.property('primaryKey')
        def.should.have.property('allowNull')
        def.field.should.be.equal('fieldName')
        def.comment.should.be.equal('comment here')
        def.primaryKey.should.be.equal(false)
        def.allowNull.should.be.equal(true)
        def.defaultValue.should.be.equal("some string")
    })

    it('should process binary attributes', function () {
        var mod = new Model()
        var json = {
            id:   "fieldName",
            type: {
                binary: {}
            }
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('definition')
        parsed.definition.should.be.an('object')
        var def = parsed.definition
        def.should.have.property('type')
        def.type.should.be.equal(Sequelize.BLOB)
    })

    it('should process boolean attributes', function () {
        var mod = new Model()
        var json = {
            id:   "fieldName",
            type: {
                boolean: {}
            }
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('definition')
        parsed.definition.should.be.an('object')
        var def = parsed.definition
        def.should.have.property('type')
        def.type.should.be.equal(Sequelize.BOOLEAN)
    })

    it('should process datetime attributes', function () {
        var mod = new Model()
        var json = {
            id:   "fieldName",
            type: {
                datetime: {}
            }
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('definition')
        parsed.definition.should.be.an('object')
        var def = parsed.definition
        def.should.have.property('type')
        def.type.should.be.equal(Sequelize.DATE)
    })

    describe('should process integer attributes', function () {

        it('simple definition', function () {
            var mod = new Model()
            var json = {
                id:   "fieldName",
                type: {
                    integer: {}
                }
            }
            var parsed = mod.parseJson(json)
            parsed.should.have.property('definition')
            parsed.definition.should.be.an('object')
            var def = parsed.definition
            def.should.have.property('type')
            def.type.should.be.equal(Sequelize.INTEGER)
        })

        it('unsigned and auto incremented', function () {
            var mod = new Model()
            var json = {
                id:   "fieldName",
                type: {
                    integer: {
                        isUnsigned:      true,
                        isAutoincrement: true
                    }
                }
            }
            var parsed = mod.parseJson(json)
            parsed.should.have.property('definition')
            parsed.definition.should.be.an('object')
            var def = parsed.definition
            def.should.have.property('type')
            def.type.options.unsigned.should.be.equal(Sequelize.INTEGER.UNSIGNED.options.unsigned)
            def.should.have.property('autoIncrement')
            def.autoIncrement.should.be.equal(true)
        })

    })

    describe('should process numeric attributes', function () {

        it('simple definition', function () {
            var mod = new Model()
            var json = {
                id:   "fieldName",
                type: {
                    numeric: {}
                }
            }
            var parsed = mod.parseJson(json)
            parsed.should.have.property('definition')
            parsed.definition.should.be.an('object')
            var def = parsed.definition
            def.should.have.property('type')
            def.type.should.be.equal(Sequelize.DECIMAL)
        })

        it('with precision and scale', function () {
            var mod = new Model()
            var json = {
                id:   "fieldName",
                type: {
                    numeric: {
                        precision: 16,
                        scale:     4
                    }
                }
            }
            var parsed = mod.parseJson(json)
            parsed.should.have.property('definition')
            parsed.definition.should.be.an('object')
            var def = parsed.definition
            def.should.have.property('type')
            def.type.options.precision.should.be.equal(16)
            def.type.options.scale.should.be.equal(4)
        })
    })

    it('should process option attributes', function () {
        var mod = new Model()
        var json = {
            id:   "fieldName",
            type: {
                option: {}
            }
        }
        var parsed = mod.parseJson(json)
        parsed.should.have.property('definition')
        parsed.definition.should.be.an('object')
        var def = parsed.definition
        def.should.have.property('type')
        def.type.should.be.equal(Sequelize.ENUM)
    })

    describe('should process text attributes', function () {

        it('simple definition', function () {
            var mod = new Model()
            var json = {
                id:   "fieldName",
                type: {
                    text: {}
                }
            }
            var def = mod.parseJson(json).definition
            def.should.have.property('type')
            def.type.should.be.equal(Sequelize.STRING)
        })

        it('with length', function () {
            var mod = new Model()
            var json = {
                id:   "fieldName",
                type: {
                    text: {
                        length: 23
                    }
                }
            }
            var def = mod.parseJson(json).definition
            def.should.have.property('type')
            def.type.options.length.should.be.equal(23)
        })

    })

    describe('should handle other branches', function () {

        it('without type data', function () {
            var mod = new Model()
            var json = {id: "fieldName"}
            var fn = mod.parseJson.bind(mod, json)
            fn.should.throw(/Attribute type is missed./)
        })

        it('with unknown type', function () {
            var mod = new Model()
            var json = {id: "fieldName", type: {}}
            var fn = mod.parseJson.bind(mod, json)
            fn.should.throw(/Unknown attribute type./)
        })
    })

})
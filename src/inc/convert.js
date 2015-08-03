'use strict'
/* libraries */
var Promise = require('promise')
/* own code */
var readFile = require('./util/readFile')
var writeFile = require('./util/writeFile')
var parseXml = require('./convert/parseXml')
var strJSON = require('./convert/strJSON')


/**
 * Main part of convert.
 * @constructor
 */
function Converter() {

    this.run = function (param) {
        var fileIn = param.demFileIn
        var fileOut = param.demFileOut
        readFile(fileIn)
            .then(parseXml)
            .then(strJSON)
            .then(function (result) {
                writeFile(fileOut, result)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
}


module.exports = Converter

/* TODO create test for converter
 * #Created on 21-Jul-15
 * */

/* To launch convert.js create test.js in this directory (it's already in gitignore) with this code: */

//var converter = require('./convert.js')
//var params = require('./generate/params.js')
//var cnv = new converter
//params.demFileIn = '../../sample/01_person/sample_01.dem.xml'
//params.demFileOut = 'dem.json'
//cnv.run(params)

/* Launch it with 'node test.js' */

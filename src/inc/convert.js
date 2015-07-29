'use strict'
/* libraries */
var fs = require('fs')
var Promise = require('promise')
/* own code */
var readFile = require('./util/readFile')
var parseXml = require('./convert/parseXml')


/**
 * Main part of convertor.
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
                writeJSON(fileOut, result)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
}

function strJSON(resultJSON) {
    return new Promise(function (resolve) {
        var result = JSON.stringify(resultJSON,
            function (key, value) // callable function to strip some useless nodes
            {
                var result = value
                if (key == 'xmlns:tns' || key == 'xmlns:xsi' || key == 'xsi:schemaLocation') result = undefined
                return result
            }, 2)
        resolve(result)
    })
}

function writeJSON(fileOut, result) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileOut, result, function (err) {
            if (err) {
                reject(err)
            } else resolve("The conversion is finished!")
        })
    })
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

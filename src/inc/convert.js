var fs = require('fs') // fs instance
var parseString = require('xml2js').parseString // xml2js instance

var prefixMatch = new RegExp(/(?!xmlns)^.*:/)



function Converter() {
    this.run = function (param) {
        var fileIn = param.demFileIn
        var fileOut = param.demFileOut
        fs.readFile(fileIn, 'ascii', function (err, data) {
            if (err) throw err
            parseString(data, {
                    tagNameProcessors: [tagStripPrefix], // strip tag prefix
                    explicitArray: false, // remove arrays in child nodes
                    mergeAttrs: true
                }, // attributes become child nodes

                function (err, result) {

                    function analyze(request) {
                        function analyzeNamespaces(request) {
                            function analyzeEntities(request) {
                                function analyzeAttr(request) {
                                    var result = {};
                                    result.field = request.id;
                                    for (var i = 0; i < request.attributes.length; i++) {
                                        result.attributes[i] = request.attributes[i]
                                    }
                                    return result
                                }

                                var result = {}
                                result.id = request.id
                                if (request.hasOwnProperty('comment')) {
                                    result.comment = request.comment
                                }
                                result.attributes = []
                                for (var i = 0; i < request.attributes.length; i++) {
                                    result.attributes[i] = analyzeAttr(request.attributes[i])
                                }
                                return result
                            }

                            var result = {}
                            result.id = request.id
                            if (request.hasOwnProperty('comment')) {
                                result.comment = request.comment
                            }
                            result.entities = []
                            for (var i = 0; i < request.entities.length; i++) {
                                result.entities[i] = analyzeEntities(request.entities[i])
                            }
                            return result
                        }

                        var result = {};
                        if (request.dBEAR.hasOwnProperty('comment')) {
                            result.comment = request.dBEAR.comment
                        }
                        result.namespaces = []
                        for (var i = 0; i < request.dBEAR.namespaces.length; i++) {
                            result.dbear.namespaces[i] = analyzeNamespaces(request.dBEAR.namespaces[i])
                        }
                        return result
                    }

                    /* TODO this function works unproperly. Rewrite it.
                     * #Created on 21-Jul-15
                     * */
                    var common = analyze(result) // common is a new result
                    var str = JSON.stringify(common, function (key, value) {
                        var result = value
                        if (key == 'xmlns:tns' || key == 'xmlns:xsi' || key == 'xsi:schemaLocation') result = undefined
                        return result
                    }, 4)
                    /* ded.json is writing to the same directory. Maybe we should create special folder? */
                    fs.writeFile(fileOut, str)
                })
        })
    }
}


function tagStripPrefix(name) {
    /* Is this function obliged? It is used once. */
    var result = name.replace(prefixMatch, '')
    return result //function to strip tag prefix
}

module['exports'] = Converter

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

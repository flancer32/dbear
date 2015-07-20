var fs = require('fs') // fs instance
var parseString = require('xml2js').parseString // xml2js instance

var prefixMatch = new RegExp(/(?!xmlns)^.*:/);

function tagStripPrefix(name){
    var result = name.replace(prefixMatch, '');
    return result //function to strip tag prefix
}

fs.readFile('ded.xml', 'ascii', function (err, data) {
    if (err) throw err
    parseString(data, {
        tagNameProcessors: [tagStripPrefix], // strip tag prefix
        explicitArray: false, // remove arrays in child nodes
        mergeAttrs: true}, // attributes become child nodes

        function (err, result) {

            function analyze(request) {
                function analyzeNamespaces(request) {
                    function analyzeEntities(request) {
                        function analyzeAttr(request) {
                            var result = {};
                            result.field = request.id;
                            for(var i = 0; i < request.attributes.length; i++) {
                                result.attributes[i] = request.attributes[i];
                            }
                            return result;
                        }

                        var result = {};
                        result.id = request.id;
                        if (request.hasOwnProperty('comment')) {
                            result.comment = request.comment;
                        }
                        result.attributes = [];
                        for (var i = 0; i < request.attributes.length; i++) {
                            result.attributes[i] = analyzeAttr(request.attributes[i])
                        }
                        return result;
                    }

                    var result = {};
                    result.id = request.id;
                    if (request.hasOwnProperty('comment')) {
                        result.comment = request.comment;
                    }
                    result.entities = [];
                    for (var i = 0; i < request.entities.length; i++) {
                        result.entities[i] = analyzeEntities(request.entities[i])
                    }
                    return result;
                }

                var result = {};
                if (request.dBEAR.hasOwnProperty('comment')) {
                    result.comment = request.dBEAR.comment;
                }
                result.namespaces = [];
                for (var i = 0; i < request.dBEAR.namespaces.length; i++) {
                    result.dbear.namespaces[i] = analyzeNamespaces(request.dBEAR.namespaces[i])
                }
                return result;
            }
        var common = analyze(result) // common is a new result
        var str = JSON.stringify(common, function(key, value) {
            var result = value;
            if (key == 'xmlns:tns' || key == 'xmlns:xsi' || key == 'xsi:schemaLocation') result = undefined;
            return result;
        }, 4)

        fs.writeFile('ded.json', str)
    })
})
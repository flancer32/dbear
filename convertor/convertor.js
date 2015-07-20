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
        mergeAttrs: true, // attributes become child nodes
        async: true},
        function (err, result) {
        var str = JSON.stringify(result, function(key, value) {
            var result = value;
            if (key == 'xmlns:tns' || key == 'xmlns:xsi' || key == 'xsi:schemaLocation') result = undefined;
            return result;
        }, 4)

        fs.writeFile('ded.json', str)
    })
})
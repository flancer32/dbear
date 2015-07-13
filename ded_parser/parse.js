var fs = require('fs') // fs instance
var xml2js = require('xml2js') // xml2js instance
var xpath = require('xml2js-xpath') //xpath instance (currently not used)

var prefixMatch = new RegExp(/(?!xmlns)^.*:/);

function tagStripPrefix(name){
    var result = name.replace(prefixMatch, '');
    return result //function to strip tag prefix
}

fs.readFile('ded.xml', 'ascii', function (err, data) {
    if (err) throw err
    xml2js.parseString(data, {
        tagNameProcessors: [tagStripPrefix], // strip tag prefix
        explicitArray: false, // remove arrays in child nodes
        mergeAttrs: true}, // attributes become child nodes
        function (err, result) {
        var str = JSON.stringify(result, function(key, value) {
            var result = value;
            if (key == 'xmlns:tns' || key == 'xmlns:xsi' || key == 'xsi:schemaLocation') result = undefined;
            return result;
        }, 4)

        fs.writeFile('ded.json', str)
    })
})
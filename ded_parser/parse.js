var fs = require('fs') // fs instance
var xml2js = require('xml2js') // xml2js instance
var xpath = require('xml2js-xpath') //xpath instance (currently not used)

var prefixMatch = new RegExp(/(?!xmlns)^.*:/);

function tagStripPrefix(name){
    return name.replace(prefixMatch, ''); //function to strip tag prefix
}

fs.readFile('ded.xml', 'utf8', function (err, data) {
    if (err) throw err
    xml2js.parseString(data, {
        tagNameProcessors: [tagStripPrefix], // strip tag prefix
        explicitArray: false, // remove arrays in child nodes
        mergeAttrs: true}, // attributes become child nodes
        function (err, result) {
        var str = JSON.stringify(result, function(key, value) {
            if (key == 'xmlns:tns') return undefined; // remove xmlns:tns tag
            if (key == 'xmlns:xsi') return undefined; // remove xmlns:xsi tag
            if (key == 'xsi:schemaLocation') return undefined; // remove xsi:schemaLocation tag
            return value;
        }, 4)

        fs.writeFile('ded.json', str)
    })
})
var fs = require('fs')
var xml2js = require('xml2js')
//var parser = xml2js.Parser({ explicitArray: true });
var xml;
var prefixMatch;

prefixMatch = new RegExp(/(?!xmlns)^.*:/);

function tagStripPrefix(name){
    return name.replace(prefixMatch, '');
}

fs.readFile('ded.xml', 'utf8', function (err, data) {
    if (err) throw err
    xml2js.parseString(data, {
        tagNameProcessors: [tagStripPrefix],},
        function (err, result) {
        var str = JSON.stringify(result, function(key, value) {
            if (key == '$') return undefined;
            return value;
        }, 4)
        fs.writeFile('ded.json', str)
    })
})
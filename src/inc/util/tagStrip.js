'use strict'
/**
 * Function to strip tag prefix.
 *
 * @param name
 * @return {*|string|void|XML}
 */

function tagStrip(name){
    var prefixMatch = new RegExp(/(?!xmlns)^.*:/)
    var result = name.replace(prefixMatch, '')
    return result
}

module.exports = tagStrip
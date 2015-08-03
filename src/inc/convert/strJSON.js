'use strict'
var Promise = require('promise')

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

module.exports = strJSON
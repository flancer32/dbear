'use strict'
var Promise = require('promise')

function strJson(resultJSON) {
    return new Promise(function (resolve) {
        var result = JSON.stringify(resultJSON, "", 2)
        resolve(result)
    })
}

module.exports = strJson
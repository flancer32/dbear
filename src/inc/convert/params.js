'use strict'
function Params() {
    this.demFileIn = undefined
    this.demFileOut = undefined
    /* 'true' - don't write result JSON to file, just return it */
    this.skipWriteOut = false
}

module.exports = new Params()
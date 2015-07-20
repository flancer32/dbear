function Converter() {
    this.run = function (param) {
        var fileIn = param.demFileIn
        var fileOut = param.demFileOut
        console.log('Convert file "' + fileIn + '" to file "' + fileOut + '".')
    }
}

module['exports'] = Converter
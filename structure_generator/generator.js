function Generator(type) {
    this.type = type;
    this.color = "red";
    this.getInfo = function () {
        return this.color + ' ' + this.type + ' apple';
    };
}

module['exports'] = Generator;
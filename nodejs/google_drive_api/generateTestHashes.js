const Chance = require("chance");
var chance = new Chance();
let name=chance.string({length: 40, pool: 'abcdefghijklmopqrstuvwxyz0123456789'});



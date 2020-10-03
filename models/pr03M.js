const fs = require('fs');

module.exports = class Items{
    getItems(callBack){
        fs.readFile('./products.json', callBack);
    }
} 
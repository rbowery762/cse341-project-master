const fs = require('fs');

module.exports = class Items{
    getItems(callBack){
        fs.readFile('./items.json', callBack);
    }
}
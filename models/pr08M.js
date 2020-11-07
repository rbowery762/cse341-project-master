const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    tags: [{
            tag: {
                type: String,
 //               required: true
            }
    }],
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Item', itemSchema);
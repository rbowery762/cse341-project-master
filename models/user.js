const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    cart: {
        items: [{
            productID: {
                type: Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true
            }, 
            quantity: { 
                type: Number, 
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product, amount){
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productID.toString() === product._id.toString();
    });
    let newQuantity = amount;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + parseInt(amount);
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productID: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.deleteFromCart = function(deleteID, amount){
    let updatedCartItems = [...this.cart.items];
    const index = this.cart.items.findIndex(item => {
        console.log(item._id);
        console.log(item._deleteID);
        console.log(deleteID);
        return item.productID._id.toString() === deleteID.toString();
    });

    if((updatedCartItems[index].quantity - amount) <= 0){
        updatedCartItems = this.cart.items.filter(item => {
            return item.productID._id.toString() !== deleteID.toString();
        });
    } else {
        updatedCartItems[index].quantity -= amount;
    }

    this.cart.items = updatedCartItems;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);

const express = require('express');
const router = express.Router();

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isLoggedIn: req.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const product = new Product({
        title: title, 
        price: price, 
        description: description,
    imageURL: imageURL});
    product.save()
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = router;
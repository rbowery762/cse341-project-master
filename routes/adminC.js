const path = require('path');
const Product = require('../models/product');
const express = require('express');
//const adminController = require('../controllerMisc/admin');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/add-product',
        editing: false
    });
});

//router.get('/products', adminController.getProducts);

router.post('/save', (req, res, next) => {
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
        console.log('Created Product');
        res.redirect('/add-product');
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;
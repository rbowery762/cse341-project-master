const Product = require('../models/product');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('pages/shop/main', {
            itemList: products,
            pageTitle: 'Shop',
            title: 'Prove 04', 
            path: '/shop',
            editing: false
        });
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;
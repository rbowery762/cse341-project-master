const Product = require('../models/product');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('pages/shop/main', {
            itemList: products,
            pageTitle: 'Shop',
            title: 'Shop', 
            path: '/shop',
        });
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/cart', (req, res, next) => {
    req.user.populate('cart.items.productID')
    .execPopulate()
    .then(user => {
        res.render('pages/shop/cart', {
            pageTitle: 'Cart',
            title: 'Cart', 
            path: '/cart',
            itemList: user.cart.items
        });
    })
    .catch(err => {
        console.log(err);
    })
});

router.post('/cart', (req, res, next) => {
    Product.findById(req.body.productID)    
    .then(product => {
        return req.user.addToCart(product, req.body.amount);
      })
      .then(result => {
        res.redirect('/shop/cart'); 
      });
});

router.post('/cartDelete', (req, res, next) => {
    req.user.deleteFromCart(req.body.productID, req.body.amount)
      .then(result => {
        res.redirect('/shop/cart'); 
      })
      .catch(err => console.log(err));
});

module.exports = router;
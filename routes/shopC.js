const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

router.get('/', (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('pages/shop/main', {
            itemList: products,
            pageTitle: 'Shop',
            title: 'Shop', 
            path: '/shop'
        });
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/cart', isAuth, (req, res, next) => {


    req.user.populate('cart.items.productID')
    .execPopulate()
    .then(user => {
        console.log(user.cart.items);
        const products = user.cart.items;

        res.render('pages/shop/cart', {
            pageTitle: 'Cart',
            title: 'Cart', 
            path: '/cart',
            itemList: products
        });
    })
    .catch(err => {
        console.log(err);
    })
     
});

router.post('/cart', isAuth, (req, res, next) => {
    Product.findById(req.body.productID)    
    .then(product => {
        return req.user.addToCart(product, req.body.amount);
      })
      .then(result => {
        res.redirect('/shop/cart'); 
      });
});

router.post('/cartDelete', isAuth, (req, res, next) => {
    req.user.deleteFromCart(req.body.deleteID, req.body.amount) 
      .then(result => {
        res.redirect('/shop/cart'); 
      })
      .catch(err => console.log(err));
});

module.exports = router;
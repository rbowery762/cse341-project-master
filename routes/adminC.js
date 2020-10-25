const path = require('path');
const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');


router.get('/', isAuth, (req, res, next) => {
    res.render('pages/admin/adminMain', {
        pageTitle: 'Admin Main',
        title: 'Prove 04', 
        path: '/main'
    });
});

router.get('/products', isAuth, (req, res, next) => {
    const user = req.user;

    Product.find() 
    .then(products => {
        res.render('pages/admin/products', {
            itemList: products,
            pageTitle: 'Admin Products',
            title: 'Your Products', 
            path: '/products',
            user: user
        });
    });
});

router.get('/products/viewProduct', isAuth, (req, res, next) => {
    const productID = req.query.productID;
    Product.findById(productID)
    .then(product => {
        res.render('pages/admin/viewProduct', {
            product: product,
            pageTitle: 'View Product',
            title: 'Prove 04', 
            path: '/viewProduct'
        });
    });
});

router.get('/products/editProduct', isAuth, (req, res, next) => {
    const productID = req.query.productID;
    Product.findById(productID)
    .then(product => {
        res.render('pages/admin/editProduct', {
            product: product,
            pageTitle: 'Edit Product',
            title: 'Prove 04', 
            path: '/editProduct',
            editing: true
        });
    });
});

router.post('/products/editProduct', isAuth, (req, res, next) => {
    const productID = req.body.productID;
    const newTitle = req.body.title;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageURL = req.body.imageURL;

    Product.findById(productID)
    .then(product => {
        product.title = newTitle;
        product.price = newPrice;
        product.description = newDescription;
        product.imageURL = newImageURL;

        return product.save()
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
});

router.get('/products/addProduct', isAuth, (req, res, next) => {
    res.render('pages/admin/editProduct', {
        pageTitle: 'Add Product',
        title: 'Prove 04', 
        path: '/addProduct',
        editing: false
    });
});

//router.get('/products', adminController.getProducts);

router.post('/products/addProduct', isAuth, (req, res, next) => { 
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const userID = req.user;
    const product = new Product({
        title: title,  
        price: price, 
        description: description,
        imageURL: imageURL,
        userID: userID
    });
    product.save()
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/products/deleteProduct', isAuth, (req, res, next) => {
    const productID = req.query.productID;
    Product.findByIdAndRemove(productID)
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
});

module.exports = router;
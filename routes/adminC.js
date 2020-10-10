const path = require('path');
const Product = require('../models/product');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/admin/adminMain', {
        pageTitle: 'Admin Main',
        title: 'Prove 04', 
        path: '/main',
        editing: false
    });
});

router.get('/products', (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('pages/admin/products', {
            itemList: products,
            pageTitle: 'Admin Products',
            title: 'Prove 04', 
            path: '/products',
            editing: false
        });
    });
});

router.get('/products/viewProduct', (req, res, next) => {
    const productID = req.query.productID;
    Product.findById(productID)
    .then(product => {
        res.render('pages/admin/viewProduct', {
            product: product,
            pageTitle: 'View Product',
            title: 'Prove 04', 
            path: '/viewProduct',
            editing: false
        });
    });
});

router.get('/products/editProduct', (req, res, next) => {
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

router.post('/products/editProduct', (req, res, next) => {
    const productID = req.body.productID;
    const newTitle = req.body.title;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageURL = req.body.imageURL;

    console.log(productID);
    console.log(newTitle);
    Product.findById(productID)
    .then(product => {
        product.title = newTitle;
        product.price = newPrice;
        product.description = newDescription;
        product.imageURL = newImageURL;

        return product.save()
    })
    .then(result => {
        console.log('Updated product');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
});

router.get('/products/addProduct', (req, res, next) => {
    res.render('pages/admin/editProduct', {
        pageTitle: 'Add Product',
        title: 'Prove 04', 
        path: '/addProduct',
        editing: false
    });
});

//router.get('/products', adminController.getProducts);

router.post('/products/addProduct', (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const product = new Product({
        title: title,  
        price: price, 
        description: description,
        imageURL: imageURL
    });
    product.save()
    .then(result => {
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/products/deleteProduct', (req, res, next) => {
    const productID = req.query.productID;
    console.log("Hi")
    Product.findByIdAndRemove(productID)
    .then(() => {
        console.log('Product Deleted');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
});

module.exports = router;
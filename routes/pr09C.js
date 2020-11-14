const express = require('express');
const router = express.Router();

const Item = require('../models/pr08M');
const ITEMS_PER_PAGE = 10;

router.get('/',(req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    Item.find()
    .countDocuments()
    .then(numProducts => {
        totalItems = numProducts;
        return Item.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
        res.render('pages/pr09V.ejs', {    
            title: 'Prove 09', 
            path: '/pr09', // For pug, EJS 
            itemList: products,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        });
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
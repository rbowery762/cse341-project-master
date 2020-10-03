const express = require('express');
const router = express.Router();
const Items = require('../models/pr03M')

router.get('/',(req, res, next) => {
    const items = new Items();
    items.getItems(function (err, data){
        if(err){
            console.log('Could not read file');
            res.end();
        } 
        else{
            const itemsData = JSON.parse(data);
            res.render('pages/pr03V/store.ejs', {  
                title: 'Prove 03', 
                path: '/pr03', // For pug, EJS 
                itemList: itemsData
            });
        }
    });
});

module.exports = router;
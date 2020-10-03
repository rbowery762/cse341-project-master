//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const Items = require('../models/items')

router.get('/',(req, res, next) => {
    const items = new Items();
    items.getItems(function (err, data){
        if(err){
            console.log('Could not read file');
            res.end();
        } 
        else{
            const itemsData = JSON.parse(data);
            res.render('pages/ta03', { 
                title: 'Team Activity 03', 
                path: '/ta03', // For pug, EJS 
                itemList: itemsData
            });
        }
    });
});

router.post('/',(req, res, next) => {
    const search = req.body;
    const items = new Items();
    items.getItems((err, data) => {
        if (err){
            console.log('Could not search');
            console.log(err);
            res.end();
        }
        else{
            const itemsData = JSON.parse(data);
            const foundItems = [];
            let searchIndex = 0;
            while (searchIndex > 0) {
                searchIndex = itemsData.findIndex(search);
                if(searchIndex > 0) {
                    foundItems.push[items[searchIndex]];
                    itemsData.splice();
                }
            }
        }
    })
})
module.exports = router;
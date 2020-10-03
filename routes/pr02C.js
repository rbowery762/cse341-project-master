const express = require('express');
const BookInfo = require('../models/pr02M');
const router = express.Router();

let bookInfo = new BookInfo;

router.get('/',(req, res, next) => {
    res.render('pages/pr02V/inputBook', {  
        title: 'Prove 02', 
        path: '/pr02', // For pug, EJS 
    });
});

router.post('/submitBook',(req, res, next) => { 
    bookInfo.submitBook(req);
    res.redirect('/pr02V/displayBook'); 
});

router.get('/displayBook',(req, res, next) => { 
    console.log("Test2");
    res.render('pages/pr02V/displayBook', { 
        title: 'Prove 02', 
        path: '/pr02', // For pug, EJS 
        name: bookInfo.bookName,
        author: bookInfo.authorName,
        description: bookInfo.bookDescription
    });
});

module.exports = router;
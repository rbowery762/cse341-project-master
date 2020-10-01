const express = require('express');
const router = express.Router();

let bookName = "Unknown";
let authorName = "Anonymous";
let bookDescription = "None";

router.get('/',(req, res, next) => {
    res.render('pages/pr02/inputBook', {  
        title: 'Prove 02', 
        path: '/pr02', // For pug, EJS 
    });
});

router.post('/submitBook',(req, res, next) => { 
    if(req.body.bookName != ""){
    bookName = req.body.bookName;}
    if(req.body.authorName != ""){
    authorName = req.body.authorName;}
    if(req.body.bookDescription != ""){
    bookDescription = req.body.bookDescription;}
    
    res.redirect('/pr02/displayBook'); 
});

router.get('/displayBook',(req, res, next) => { 
    console.log("Test2");
    res.render('pages/pr02/displayBook', { 
        title: 'Prove 02', 
        path: '/pr02', // For pug, EJS 
        name: bookName,
        author: authorName,
        description: bookDescription
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    if(!req.session.style){
        req.session.style = "#ffffff";
    }
    if(!req.session.counter){
        req.session.counter = 0;
    }
    const color = req.session.style;
    const counter = req.session.counter;

    res.render('pages/ta05V', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        color: color,
        counter: counter,
        isLoggedIn: req.session.loggedIn
    });
});

router.post('/change-style',(req, res, next) => {
    req.session.style = req.body.color;
    res.redirect('/ta05/');
});

router.post('/counter',(req, res, next) => {
    if(req.body.inc){
        req.session.counter++;
    }
    if(req.body.dec){
        req.session.counter--;
    }
    res.redirect('/ta05/');
});

router.post('/reset',(req, res, next) => {
    req.session.destroy();
    res.redirect('/ta05/');
});

module.exports = router;
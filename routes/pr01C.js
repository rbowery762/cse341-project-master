const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/pr01V/input', { 
        title: 'Prove 01', 
        path: '/pr01', // For pug, EJS 
    });
});

router.post('/submit',(req, res, next) => {
    req.body
    res.render('pages/pr01V/result', { 
        title: 'Prove 01', 
        path: '/pr01', // For pug, EJS 

        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
});
module.exports = router;
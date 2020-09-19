const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/pr01/input', { 
        title: 'Prove 01', 
        path: '/pr01', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/submit',(req, res, next) => {
    req.body
    res.render('pages/pr01/result', { 
        title: 'Prove 01', 
        path: '/pr01', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
});
module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('pages/loginV', { 
        title: 'Login', 
        path: '/login', // For pug, EJS 
    });
});


module.exports = router;
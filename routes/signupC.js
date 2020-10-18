const express = require('express');
const User = require('../models/user');
const router = express.Router();
const encrypt = require('bcryptjs');

router.get('/',(req, res, next) => {
    // if(message.length > 0){
    //     message = message[0];
    // }
    // else {
    //     message = null;
    // }

    res.render('pages/signupV', { 
        title: 'Sign Up', 
        path: '/signup', // For pug, EJS,
        errorMessage: req.flash('error')
    });
});

router.post('/',(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.password;
    const username = req.body.username;

    if(password !== passwordConfirm){
        req.flash('error', 'Your password and confirmed password do not match');
        return res.redirect('/signup');
    }
    User.findOne({email: email})
    .then(userWithSameEmail => {
        if(userWithSameEmail){
            req.flash('error', 'An account with that Email already exists');
            return res.redirect('/signup');
        }
        return encrypt.hash(password, 12)    
        .then(hashedPassword => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                cart: {items: []}
            });
            return user.save();
        })
        .then(result => {
            return res.redirect('/login');
        });
    })
    .catch(err => {console.log(err);});
});

module.exports = router;
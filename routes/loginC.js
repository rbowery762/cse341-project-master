const express = require('express');
const User = require('../models/user');
const router = express.Router();
const encrypt = require('bcryptjs');

router.get('/',(req, res, next) => {
    // let message = req.flash('error');
    // if(message.length > 0){
    //     message = message[0];
    // }
    // else {
    //     message = null;
    // }

    res.render('pages/loginV', { 
        title: 'Login', 
        path: '/login', // For pug, EJS,
        errorMessage: req.flash('error')
    });
});

router.post('/',(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email');
            return res.redirect('/login');
        }
        encrypt.compare(password, user.password)
        .then(match => {
            if(match) {
                req.session.loggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            req.flash('error', 'Invalid password');
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;
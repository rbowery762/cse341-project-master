const express = require('express');
const User = require('../models/user');
const router = express.Router();
const encrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

router.get('/',(req, res, next) => {
    let message = req.flash('error');

    if(message.length > 0){
        message = message[0];
    }
    else {
        message = null;
    }

    res.render('pages/signupV', { 
        title: 'Sign Up', 
        path: '/signup', // For pug, EJS,
        errorMessage: message
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
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: 'dragoncat99@icloud.com',
                subject: 'Thank your for signing up for our service!',
                html: '<h1> You successfully signed up!</h1>'
            });
        })
        .catch(err => {console.log(err);});
    })
    .catch(err => {console.log(err);});
});

module.exports = router;
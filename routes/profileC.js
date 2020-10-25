const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const isAuth = require('../middleware/isAuth');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const user = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

router.get('/',(req, res, next) => {
    let message = req.flash('sent'); 
    const user = req.user;

    if(message.length > 0){
        message = message[0];
    }
    else {
        message = null;
    }

    res.render('pages/profile/profileV', {  
        title: user.username, 
        path: '/profile', // For pug, EJS
        message: message,
        user: user
    });
});

router.get('/resetPassword', isAuth, (req, res, next) => {
    let message = req.flash('sent');

    if(message.length > 0){
        message = message[0];
    }
    else {
        message = null;
    }

    res.render('pages/profile/resetPassword', {  
        title: 'Reset Password', 
        path: '/profile/resetPassword', // For pug, EJS
        message: message
    });
});

router.post('/resetPassword', isAuth, (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if(err) {
            console.log(err);
            return res.redirect('/profile/resetPassword')
        }
        const token = buffer.toString('hex');
        user.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                req.flash('sent', 'No account with that email found');
                return res.redirect('/profile/resetPassword');
            }
            if(!req.user.email.toString() === req.body.email.toString()){
                req.flash('sent', 'Wrong Email');
                return res.redirect('/profile/resetPassword');
            }

            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        })
        .then(result => {
            transporter.sendMail({
                to: email,
                from: 'dragoncat99@icloud.com', 
                subject: 'Password Reset',
                html: `
                    <p>It seems you want to reset your password. 
                    If you didn't ask for this, simply ignore this email. 
                    If you do want to reset, click the link below. The link will only be valid for one hour! 
                    <a href="http://localhost:5000/profile/newPassword/${token}">Reset</a></p>
                    
                `
            })
            .catch(err => {
                console.log(err);
                req.flash('sent', 'Sorry, something went wrong!');
                res.redirect('/profile/resetPassword');
            });

            req.flash('sent', 'Email Sent');
            res.redirect('/profile');
        })
        .catch( err =>{
            console.log(err);
        });
    });

    router.get('/newPassword/:token', isAuth, (req, res, next) => {
        const token = req.params.token;
        user.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()} })
        .then(user => {
            let message = req.flash('error');
        
            if(message.length > 0){
                message = message[0];
            }
            else {
                message = null;
            }
        
            res.render('pages/profile/newPassword', {  
                title: 'New Password', 
                path: '/profile/newPassword', // For pug, EJS
                message: message,
                userID: user._id.toString(),
                passwordToken: token
            });
        })
        .catch( err =>{
            console.log(err);
        });
    });

    router.post('/newPassword', isAuth, (req, res, next) => {
        const newPassword = req.body.password;
        const userID = req.body.userID;
        const passwordToken = req.body.passwordToken;
        let resetUser;

        user.findOne({resetToken: passwordToken, 
            resetTokenExpiration: {$gt: Date.now()}, 
            _id: userID})
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);  
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = null;
            resetUser.resetTokenExpiration = null;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch( err =>{
            console.log(err);
        });
    });

});


module.exports = router;
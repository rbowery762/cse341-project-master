const express = require('express');
const router = express.Router();

router.post('/',(req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
});

module.exports = router;
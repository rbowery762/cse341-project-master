const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {

    res.status(200).json({
        title: 'Prove 09', 
        path: '/pr09'
    });

});
 
router.post('/post',(req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        title: 'Prove 09', 
        path: '/pr09',
        post: { 
            id: new Date().toISOString(), 
            title: title, 
            content: content
        }
    });

})

module.exports = router;
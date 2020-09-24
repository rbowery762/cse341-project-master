//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const userList = ['Dragon', 'Cat', '99'];
let errorMessage;

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        users: userList,
        error: errorMessage,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

router.post('/addUser',(req, res, next) => {
    const newUserName = req.body.newUser;
    if (userList.includes(newUserName)){
        errorMessage = "Username already in use";
    } else{
        userList.push(newUserName);
        errorMessage = null;
    };
    res.redirect('/ta02'); 

});

router.post('/removeUser',(req, res, next) => {
    const removedUserName = req.body.removeUser;
    const index = userList.indexOf(removedUserName);
    if (index > -1){
        userList.splice(index, 1);
        errorMessage = null;
    } else{
        errorMessage ="User not found"; 
    }
    console.log(userList);
    res.redirect('/ta02');
});
module.exports = router; 
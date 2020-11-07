/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const mongoose = require('mongoose');
const cors = require('cors'); // Place this with other requires (like 'path' and 'express')
const app = express();
const User = require('./models/user');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

const MongoDBStore = require('connect-mongodb-session')(session);

const corsOptions = {
    origin: "https://cse341-project-master.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const csrfProtection = csrf();

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Dragoncat99:Echomoon11@cluster0.ma3ou.mongodb.net/shop?retryWrites=true&w=majority&authSource=admin";

// Route setup. You can implement more in the future!
//Proves
const pr01Routes = require('./routes/pr01C');
const pr02Routes = require('./routes/pr02C');
const pr03Routes = require('./routes/pr03C');
const pr08Routes = require('./routes/pr08C');
//Proper
const adminRoutes = require('./routes/adminC');
const shopRoutes = require('./routes/shopC');
const loginRoutes = require('./routes/loginC');
const logoutRoutes = require('./routes/logoutC');
const signUpRoutes = require('./routes/signupC');
const profileRoutes = require('./routes/profileC');
//Teams
const ta01Routes = require('./routes/ta01C');
const ta02Routes = require('./routes/ta02C');
const ta03Routes = require('./routes/ta03C'); 
const ta04Routes = require('./routes/ta04C'); 
const ta05Routes = require('./routes/ta05C'); 


const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});

app.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.urlencoded({extended: false})) // For parsing the body of a POST
.use(session({
  secret: "UwU", 
  resave: false, 
  saveUninitialized: false,
  store: store
}));
app.use(csrfProtection);

app.use(flash());

app.use((req, res, next) => {
  if(!req.session.user){
    return next(); 
  }
  //console.log(req.session.user._id);
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

    app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.loggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
    })
   //Prove routes
   .use('/pr01', pr01Routes)
   .use('/pr02', pr02Routes)
   .use('/pr03', pr03Routes)
   .use('/pr08', pr08Routes)
   //Proper routes
   .use('/admin', adminRoutes)
   .use('/shop', shopRoutes)
   .use('/login', loginRoutes)
   .use('/logout', logoutRoutes)
   .use('/signup', signUpRoutes)
   .use('/profile', profileRoutes)
   //Team routes
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/ta05', ta05Routes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {
        title: 'Welcome to my store!', 
        path: '/',
        isLoggedIn: req.session.loggedIn});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {
        title: '404 - Page Not Found', 
        path: req.url,
        isLoggedIn: req.session.loggedIn});
   })
   .use((err, req, res, next) => {
     console.log(err);
     res.render('pages/500', {
       title: '500 - Server Error',
       path: req.url
     })
   });



   mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => { 
    // This should be your user handling code implement following the course videos 
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err); 
  });



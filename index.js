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

const corsOptions = {
    origin: "https://cse341-project-master.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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
//Proper
const adminRoutes = require('./routes/adminC');
const shopRoutes = require('./routes/shopC');
const loginRoutes = require('./routes/loginC')
//Teams
const ta01Routes = require('./routes/ta01C');
const ta02Routes = require('./routes/ta02C');
const ta03Routes = require('./routes/ta03C'); 
const ta04Routes = require('./routes/ta04C'); 
const ta05Routes = require('./routes/ta05C'); 

app.use(express.static(path.join(__dirname, 'public')))
  .use((req, res, next) => {
    User.findById('5f876bb6240b213aec3f9e16')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
    })
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser.urlencoded({extended: false})) // For parsing the body of a POST
   .use(session({
     secret: "UwU"
   }))
   //Prove routes
   .use('/pr01', pr01Routes)
   .use('/pr02', pr02Routes)
   .use('/pr03', pr03Routes)
   //Proper routes
   .use('/admin', adminRoutes)
   .use('/shop', shopRoutes)
   .use('/login', loginRoutes)
   //Team routes
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/ta05', ta05Routes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url});
   });

  //  app.use((req, res, next) => {
  //    User.findById('5f876bb6240b213aec3f9e16')
  //    .then(user => {
  //      req.user = user;
  //      next();
  //    })
  //    .catch(err => console.log(err));
  //    console.log('Logged in as ', req.user);
  //  });

   mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => { 
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: 'Rachel',
          email: 'bow18018@byui.edu',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    // This should be your user handling code implement following the course videos 
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err); 
  });



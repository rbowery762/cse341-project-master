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
const cors = require('cors'); // Place this with other requires (like 'path' and 'express')
const mongoose = require('mongodb');

const app = express();

// Route setup. You can implement more in the future!
//Proves
const pr01Routes = require('./routes/pr01C');
const pr02Routes = require('./routes/pr02C');
const pr03Routes = require('./routes/pr03C');
//Teams
const ta01Routes = require('./routes/ta01C');
const ta02Routes = require('./routes/ta02C');
const ta03Routes = require('./routes/ta03C'); 
const ta04Routes = require('./routes/ta04C'); 

const corsOptions = {
    origin: "https://<your_app_name>.herokuapp.com/",
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

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Dragoncat99:Dragoncat99@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";


mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => { // This should be your user handling code implement following the course videos 
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });


app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   //Prove routes
   .use('/pr01', pr01Routes)
   .use('/pr02', pr02Routes)
   .use('/pr03', pr03Routes)
   //Team routes
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })
   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

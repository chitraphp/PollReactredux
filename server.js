const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const poll = require('./routes/api/poll');
const user = require('./routes/api/user');
const cors =require('cors');
const app = express();
const passportSetup = require('./config/passport-setup');
//chitra
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db,{useNewUrlParser:true})
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

app.get('/',(req,res)=>res.send("hello "));

app.use('/api/poll',poll);
app.use('/api/users', user);
const port = 8000;
app.listen(port, ()=> console.log(`server is running on port ${port}`));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const poll = require('./routes/api/poll');
const cors =require('cors')
const app = express();

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
const port = 8000;
app.listen(port, ()=> console.log(`server is running on port ${port}`));
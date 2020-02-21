const express = require('express');
const router = express.Router();
const Poll = require('../../models/poll');

//  @route  GET api/users/test
//  @desc   Tests user route
//  @access Public
router.get('/test', 
  (req, res) => res.json({
    msg: 'questions works'
  }));

  router.get('/', (req, res) => {
    const errors = {};
  
    Poll.findOne({status:"active"})      
      .then(poll => {
        if (!poll) {
          errors.nopoll = 'There is no active poll';
          return res.status(404).json(errors);
        }
  
        res.json(poll);
      })
      .catch(err => res.status(404).json({ poll: 'There is no poll' }));
  });
  
  router.post('/',(req,res)=>{
    const {question, options, status} = req.body;
    console.log("question");
    console.log(status);
    const poll = new Poll({
      question,
      status,
      options:options.map(option=>({option,votes:0}))
    });
    poll.save().then(poll => res.json(poll))
    .catch(err=> console.log(err));
  });

  module.exports = router;
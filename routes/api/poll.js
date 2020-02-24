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
// get all polls
  router.get('/all', (req, res) => {
    const errors = {};
    Poll.find()      
      .then(polls => {
        if (!polls) {
          errors.nopoll = 'There is no active poll';
          return res.status(404).json(errors);
        }
        res.json({polls});
      })
      .catch(err => res.status(404).json({ polls: 'There is no polls' }));
  });

  /*** get avtive poll */
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
/*********************Get poll by id************ */
  router.get('/:id', (req, res) => {
    const errors = {};
  
    Poll.findById({_id:req.params.id})      
      .then(poll => {
        if (!poll) {
          errors.nopoll = 'There is no  poll';
          return res.status(404).json(errors);
        }  
        res.json(poll);
      })
      .catch(err => res.status(404).json({ poll: 'There is no poll' }));
  });
  
  /*******************create a new poll ************/
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

/*************************vote on a poll*************************/
  router.post('/vote/:id',(req,res)=>{
    const {answer} = req.body;
    console.log(answer);
    console.log(req.params.id);
    Poll.findById({_id:req.params.id})
    .then(poll=>{
      if(answer){
        const vote = poll.options.map(option=>
          option.option === answer? {
            _id:option.id,
            option:option.option,
            votes:option.votes+1
          }:option);          
        poll.options = vote;
        poll.voted = poll.voted+1;
        poll.save().then(res.json(poll));        
      }else{
        throw new Error("Answer not provided")
      }      
    }).catch(err=>res.json({error:"there is no poll"}))    
  });

  /***************************Delete Post***************************/
  router.delete('/:id', (req, res) => {
    const errors = {};
    Poll.findOneAndRemove({_id:req.params.id})      
      .then(() => {
        res.json({"success":"true"})
      })
      .catch(err => res.status(404).json({ poll: 'can not delete poll' }));
  });


  module.exports = router;
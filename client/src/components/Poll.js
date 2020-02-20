import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

export default class Poll extends React.Component{

  componentDidMount(){
    axios.get('/api/poll')
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err));
    
  }

  render(){
    return(
      <div>Poll</div>

    );
  }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from "axios";
import {getPoll} from '../actions/poll';

class Poll extends React.Component {
  
  componentDidMount(){
    this.props.getPoll();      
  }
  render() {
    const {poll} = this.props.poll;
    //console.log(poll.question);
    const answers = poll.options && poll.options.map(option=>(
      <button key={option._id}>{option.option}</button>
    ));
    return(
      <div>
        <div>{poll.question}</div>
        <div>{answers}</div>

      </div>
    )
  };

}
Poll.propTypes = {
  getPoll: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  poll: state.poll
});

export default connect(mapStateToProps, { getPoll })(Poll);

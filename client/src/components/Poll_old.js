import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPoll,vote} from '../actions/poll';
import {Button,Container,Header,Card} from 'semantic-ui-react'
class Poll extends Component {
  
  componentDidMount(){
    this.props.getPoll();      
  }
  render() {
    console.log(this.props.poll)
    const {poll} = this.props.poll;
    console.log(poll)
    // Both functions only render information if it has loaded from database. 
    const answers =(poll)=>{
      try{
        console.log(poll._id);
        if(poll !== null || 'undefined')
        return (poll.options && poll.options.map(option=>(
        <Button primary content={option.option} key={option._id}
          onClick = {()=>this.props.vote(poll._id,{answer:option.option})}/>
        )))
      }
      catch(err){
        console.log(err)
      }
    }
    
    const question =(poll)=>{
      try{
        if(poll !== null || 'undefined')
        return <Header as='h5'>{poll.question}</Header>
      }
      catch(err){
        console.log(err)
      }
    }
    // Only renders if there is information to render
    if(poll!==null || "undefined"){
    return(
      <Container fluid>
        <Card centered>
          <Card.Content>
            <Card.Header as ='h2'>Question of the day!</Card.Header>
            <Card.Meta> {question(poll)} </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            {answers(poll)}
          </Card.Content>
        </Card>
    </Container>
    )
  }
  else{
    return <h1>Data Loading</h1>
  }
}

}
Poll.propTypes = {
  getPoll: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  vote:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  poll: state.poll
});

export default connect(mapStateToProps, { getPoll,vote })(Poll);

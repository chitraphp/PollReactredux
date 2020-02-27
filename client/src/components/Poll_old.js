import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPoll,vote} from '../actions/poll';
import {Button,Container,Header,Card,Segment,Dimmer,Loader, ButtonGroup} from 'semantic-ui-react'
import PollResults from './PollResults'
class Poll extends Component {
  
  componentDidMount(){
    this.props.getPoll();      
  }
  render() {
    console.log(this.props.poll)
    const {poll} = this.props.poll;
    console.log(poll.status)
    // Both functions only render information if it has loaded from database. 
    
    const answers =(poll)=>{
      try{
        console.log(poll._id);
        if(poll !== null || 'undefined' || poll.status==='active')
        return (
          poll.options && poll.options.map(option=>(
            <Button primary content={option.option} key={option._id}
            onClick = {()=>{this.props.vote(poll._id,{answer:option.option})}}/>
          ))
        )
      }
      catch(err){
        console.log(err)
      }
    }
    const question =(poll)=>{
      try{
        if(poll !== null || 'undefined' || poll.status==='active')
        return <Header as='h5'>{poll.question}</Header>
      }
      catch(err){
        console.log(err)
      }
    }
    // Only renders if there is information to render
    if(poll !==null || "undefined"){
    return(
      <Container fluid>
        <Card fluid >
          <Card.Content>
            <Card.Header as ='h2'>Question of the day!</Card.Header>
            <Card.Meta> {question(poll)} </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <ButtonGroup flex='true'>
              {answers(poll)}
            </ButtonGroup>
          </Card.Content>
          <Card.Content>
            <PollResults poll ={poll}/>
          </Card.Content>
        </Card>
    </Container>
    )
  }
  else{
    return (
    <Segment>
      <Dimmer active>
        <Loader indeterminate>Loading Information</Loader>
        </Dimmer>
    </Segment>
    )
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

import React, { Component } from 'react';
import PollGridTable from './PollGridTable'
import NewPoll from '../NewPoll';
import {getPolls} from '../actions/poll';
import axios from 'axios';
class PollGrid extends Component{
    state = {
        polls:[],
        page:1,
        itemsPerPage:5
    }
    setPageNum = (event, { activePage }) => {
        this.setState({ page: activePage });
    };
    // Grabs All Polls from database 
    getPollData= async () => {
        const response= await axios.get('http://localhost:8000/api/poll/all')  
        console.log(response.data)
        const body = response.data        
        console.log(body)
        this.setState({polls: body.polls})
    }
    componentDidMount(){
        this.getPollData()
    }
    // While polls are not loaded or there are no polls to grab
    NoPolls =()=>{
            return (
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="dont icon"></i>
                            No Polls have been posted yet!
                        </div>
                    <NewPoll/>
                </div>
            ) 
        }
    render(){   
        if( this.state.polls.length=== 0 ) {
                    return(
                    this.NoPolls()
                ) 
            }
        else{
            console.log(this.state.polls)
            // send through polls as props to children component
            return(
                <PollGridTable polls= {this.state.polls} page={this.state.page} itemsPerPage={this.state.itemsPerPage} onPage={this.setPageNum}/>
            )
        }
    }
}

Poll.propTypes = {
    getPolls: PropTypes.func.isRequired,
    polls: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    polls: state.polls
  });


export default connect(mapStateToProps, { getPolls})(PollGrid);
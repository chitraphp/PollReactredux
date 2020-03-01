import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import {Button} from 'semantic-ui-react';

 class Chart extends Component {     
  render() {
    const {poll} = this.props.poll;
    //console.log(poll.options);  
//var len = poll.options.length;
//console.log(len);
    //var data = poll.options.map(option => option.option);
       /****var chartData1= {     
      labels: poll.options.map(option => option.option),
      datasets:[
        {
          label: poll.question,      
          data: poll.options.map(option => option.votes)
        }
      ]                     
 };  ***/
    
    return (
      <div>
        {poll.question}
        
      </div>
    )
  }
}

Chart.propTypes = {  
  poll: PropTypes.object.isRequired,  
};

const mapStateToProps = state => ({
  poll: state.poll
});

export default connect(mapStateToProps, null)(Chart);

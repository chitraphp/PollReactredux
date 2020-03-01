import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { googleLogin } from '../../actions/authActions';


class Google extends Component {
  componentDidMount(){
    this.props.googleLogin();
    //this.props.history.push('/home');
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
Google.propTypes={
  googleLogin:PropTypes.func.isRequired
}
export default connect(null, { googleLogin })(Google);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Logout extends Component {
  componentDidMount(){
    this.props.logoutUser();
    this.props.history.push('/home');
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
Logout.propTypes={
  logoutUser:PropTypes.func.isRequired
}
export default connect(null, { logoutUser })(Logout);
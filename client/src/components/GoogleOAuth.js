import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions/authActions';
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { isNull } from 'util';

class GoogleOAuth extends Component {  
  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          client_id:
            '797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
    this.onSignInClick = this.onSignInClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);

    console.log('this.auth',this.auth);
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      console.log('chitra',this.props.isSignedIn)
      const user={
        id:this.auth.currentUser.get().getId(),
        email:this.auth.currentUser.get().getBasicProfile().getEmail(),
        name:this.auth.currentUser.get().getBasicProfile().getName()
      }
      //const user={}
      console.log('user',user);
      this.props.signIn(user);
    } else {
      this.props.signOut();
    }
  };
  onSignInClick(){
    console.log('sign auth',this.auth);
    this.auth.signIn();
  }
  onSignOutClick(){
    this.auth.signOut();

  }
  renderAuthButton() {
    console.log('authrender',this.auth);
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}
const mapStateToProps = state=>({
  isSignedIn:state.auth.isSignedIn
})
export default connect(mapStateToProps
  ,{signIn,signOut})(GoogleOAuth)
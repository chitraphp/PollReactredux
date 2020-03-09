import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
//import { googleLogin } from '../../actions/authActions';


class Google extends Component {
  constructor(props) {
    super(props);    
    this.responseGoogle = this.responseGoogle.bind(this);
    
  }  
  componentDidMount(){
    this.responseGoogle = this.responseGoogle.bind(this);
    //this.props.googleLogin();
    //this.props.history.push('/home');
  }
  // async responseGoogle(res) {
  //   console.log('uToken',res);
  //   await this.props.googleLogin(res.accessToken);
    
  //   if (!this.props.errorMessage) {
  //     this.props.history.push('/dashboard');
  //   }
  // }
  // responseGoogle(res){
  //   console.log('responseGoogle',res)
  // }
  render() {
    return (
      <div>
        <GoogleLogin 
              clientId="400612135897-bqael6r78bhab5gj0f5dkcvdh7jbt7ek.apps.googleusercontent.com"
              render={renderProps => (
                <button className="btn btn-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-danger"
            />
        
      </div>
    )
  }
}
Google.propTypes={
  googleLogin:PropTypes.func.isRequired
}

export default connect(null, {  })(Google);
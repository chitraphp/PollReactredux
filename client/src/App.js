import React, {Component}from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Poll from './components/Poll_old';
import Landing from './components/layout/Landing';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Register from './components/auth/Register1';
import Login from './components/auth/Login';
import NavBar from './components/HomePage/NavigationBar'
import PollGrid from './components/PollGrid/PollGrid';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component{
  render(){
    return(
    <Provider store={store}>
      <Router>
        <NavBar/>
        <div className="App">
          <Switch>
            <Route exact path="/admin" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/home' component={Poll}/>
            <Route exact path='/table' component={PollGrid}/>
            <Redirect to ='/login'/>
          </Switch>
        </div>
      </Router>
    </Provider>      

    )
  }
}


export default App;

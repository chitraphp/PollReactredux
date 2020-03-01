import React, {Component}from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Poll from './components/Poll_old';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register1';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import NavBar from './components/HomePage/NavigationBar'
import PollGrid from './components/PollGrid/PollGrid';
import PrivateRoute from './components/common/PrivateRoute';
import Google from './components/auth/Google';

import './App.css';

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
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/google" component={Google} />
            <Route exact path='/home' component={Poll}/>
            <PrivateRoute exact path='/table' component={PollGrid}/>
            <Redirect to ='/home'/>
          </Switch>
        </div>
      </Router>
    </Provider>      

    )
  }
}


export default App;

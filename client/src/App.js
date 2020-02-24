import React, {Component}from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Poll from './components/Poll_old';
import Landing from './components/layout/Landing';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Register from './components/auth/Register1';
import Login from './components/auth/Login';

import './App.css';

class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <Router>
      <div className="App">
      <Route exact path="/admin" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Poll></Poll>
    </div>
      </Router>
    </Provider>      

    )
  }
}
/*****
function App() {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
      <Route exact path="/admin" component={Landing} />
      <Poll></Poll>
    </div>
      </Router>
    </Provider>
  );
}****/

export default App;

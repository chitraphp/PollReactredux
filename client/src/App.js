import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Poll from './components/Poll_old';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <h1>Poll App</h1>
      <Poll></Poll>
    </div>
    </Provider>
  );
}

export default App;

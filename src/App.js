import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Let&apos;s net!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div class="fab fab__push">
          <img class="fab__image" src="./images/push-off.png" alt="Push Notification" />
        </div>
      </div>
    );
  }
}

export default App;

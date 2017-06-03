import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import logo from './logo.svg';
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

injectTapEventPlugin();

const app =
    <Router>
        <MuiThemeProvider>
            <div className="App">
                <AppBar title="Let's net" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to Let&apos;s net!</h2>
                </div>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <hr/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                </div>
            </div>
        </MuiThemeProvider>
    </Router>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
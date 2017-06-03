import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import logo from './logo.svg';
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Contacts from "./Components/Contacts/Contacts";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from "./Components/TopBar/TopBar";

injectTapEventPlugin();

const app =
    <Router>
        <MuiThemeProvider>
            <div className="App">
                <TopBar />
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>You are at SWWAW</h2>
                </div>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contacts" component={Contacts}/>
                </div>
            </div>
        </MuiThemeProvider>
    </Router>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
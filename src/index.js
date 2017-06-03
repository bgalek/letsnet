import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Contacts from "./Components/Contacts/Contacts";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from "./Components/TopBar/TopBar";
import Ticket from "./Components/Ticket/Ticket";
import Schedule from "./Components/Schedule/Schedule";
import Scanner from "./Components/Scanner/Scanner";

injectTapEventPlugin();

const app =
    <Router>
        <MuiThemeProvider>
            <div className="App">
                <TopBar/>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contacts" component={Contacts}/>
                    <Route path="/schedule" component={Schedule}/>
                    <Route path="/scanner" render={(props) => <Scanner {...props} onScaned={console.log}/>}/>
                    <Route path="/ticket" render={(props) => <Ticket {...props} name="Bartosz"/>}/>
                </div>
            </div>
        </MuiThemeProvider>
    </Router>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
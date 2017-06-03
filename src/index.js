import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from "./Components/TopBar/TopBar";
import config from "./config";

injectTapEventPlugin();

const app =
    <Router>
        <MuiThemeProvider>
            <div className="App">
                <TopBar menuItems={config.menu}/>
                {config.menu}
            </div>
        </MuiThemeProvider>
    </Router>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
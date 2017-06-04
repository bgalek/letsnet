import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from "./Components/TopBar/TopBar";
import config from "./config";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const muiTheme = getMuiTheme({palette: config.palette});

if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
    window.screen.orientation.lock();
}

const app =
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
            <div className="App">
                <TopBar menuItems={config.menu}/>
                {config.menu}
            </div>
        </Router>
    </MuiThemeProvider>;

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
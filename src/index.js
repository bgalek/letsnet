// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import createHistory from 'history/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

import App from './Components/App';
import FirebaseAuth from './Firebase/Firebase';
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import config from './Config/config';
import theme from "./Config/theme";
import './index.css';

injectTapEventPlugin();

const auth = new FirebaseAuth(config.FIREBASE_CONFIG);

const app = (
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <BrowserRouter history={createHistory({forceRefresh: true})}>
            <ScrollToTop>
                <App auth={auth}/>
            </ScrollToTop>
        </BrowserRouter>
    </MuiThemeProvider>
);

ReactDOM.render(app, document.querySelector('#app'));
registerServiceWorker();

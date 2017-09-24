// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FirebaseAuth from './Firebase/Firebase';
import './index.css';
import App from './Components/App';
import config from './Config/config';
import Router from "./Components/Router";
import Theme from "./Components/Theme";

injectTapEventPlugin();

const auth = new FirebaseAuth(config.FIREBASE_CONFIG);

const app =
    <Theme>
        <Router>
            <App auth={auth}/>
        </Router>
    </Theme>;

ReactDOM.render(app, document.querySelector('#app'));
registerServiceWorker();

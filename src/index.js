// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FirebaseAuth from './Firebase/Firebase';
import './index.css';
import App from './Components/App';

import config from './Config/config';

injectTapEventPlugin();

const auth = new FirebaseAuth(config.FIREBASE_CONFIG);

ReactDOM.render(<App auth={auth}/>, document.querySelector('#app'));
registerServiceWorker();

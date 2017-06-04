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
import {fade} from "material-ui/utils/colorManipulator";

import {
    cyan500,
    grey300,
    white,
    darkBlack,
    fullBlack,
    teal400, amber500, amber100, amber200, tealA700, tealA400
} from "material-ui/styles/colors";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: tealA700,
        primary2Color: tealA400,
        primary3Color: teal400,
        accent1Color: amber500,
        accent2Color: amber100,
        accent3Color: amber200,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
});

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
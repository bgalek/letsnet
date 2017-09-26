import React, {Component} from 'react';
import theme from '../Config/theme';
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Theme extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}
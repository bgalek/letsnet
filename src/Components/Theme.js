import * as React from "react";
import theme from '../Config/theme';
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Theme extends React.Component {
    state = {
        theme: theme
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}
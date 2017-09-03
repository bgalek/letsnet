import * as React from "react";
import {LinearProgress, Paper, RaisedButton, TextField} from "material-ui";
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';

export default class Login extends React.Component {

    static propTypes = {
        handleLogin: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            loading: false,
            error: null
        };
    }

    handleSubmit(event) {
        const {handleLogin} = this.props;

        const login = this.loginField.getValue();
        const password = this.passwordField.getValue();

        this.setState({loading: true});

        handleLogin(login, password).catch(error => this.setState({
            loading: false,
            error: error.message
        }));

        event.preventDefault();
    }

    resetErrors() {
        this.setState({error: null});
    }

    render() {
        return (
            <Paper style={{padding: 30, margin: 30, textAlign: 'center', display: 'flex', flexDirection: 'column'}}
                   zDepth={1}>
                {this.state.loading ? <LinearProgress mode="indeterminate"/> : null}
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        type="text"
                        hintText="bartosz.galek"
                        floatingLabelText="login"
                        ref={(input) => this.loginField = input}
                        onChange={() => this.resetErrors()}
                        fullWidth={true}
                    />
                    <TextField
                        type="password"
                        hintText="wprowadź hasło z identyfikatora"
                        floatingLabelText={Messages.password}
                        ref={(input) => this.passwordField = input}
                        fullWidth={true}
                        onChange={() => this.resetErrors()}
                        errorText={this.state.error}
                    />
                    <RaisedButton type="submit" style={{marginTop: '30px'}} label="zaloguj" primary={true}
                                  onClick={(event) => this.handleSubmit(event)}/>
                </form>
            </Paper>
        )
    }
}
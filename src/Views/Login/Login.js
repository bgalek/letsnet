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
        const email = this.props.location.search.split("=")[1];
        return (<div style={{padding: 30}}>
            <h1>Zapraszamy na <br/>{this.props.title}!</h1>
            <p style={{fontSize: '1.6rem', wordSpacing: '0.2rem'}}>Jeszcze tylko jeden krok dzieli Cię od rozpoczęcia
                networking z LetsNet:</p>
            <TextField onChange={() => this.setState({showOkButton: true})} floatingLabelText="Ustaw hasło" fullWidth={true}/>
            <p>
                {this.state.showOkButton ? <RaisedButton label="Zapisz" primary={true}/> : null}
            </p>
            <p style={{position: 'fixed', bottom: 16, wordSpacing: '0.2rem'}}>Twoje konto zostanie przypisane<br/>
                do adresu <strong>{email}</strong></p>
        </div>)
    }

    render2() {
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
import * as React from "react";
import {RaisedButton, TextField} from "material-ui";
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';

export default class Register extends React.Component {

    static propTypes = {
        handleRegister: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            error: null
        };
    }

    handleSubmit(event) {
        if (!this.state.error) {
            console.log('creating account', this.getEmailFromQuery(), this.state.password);
            this.props.handleRegister(this.getEmailFromQuery(), this.state.password).catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }
        event.preventDefault();
    }

    render() {
        return (<div style={{padding: 30}}>
            <h1>Zapraszamy na <br/>{this.props.title}!</h1>
            <p style={{fontSize: '1.6rem', wordSpacing: '0.2rem'}}>Jeszcze tylko jeden krok dzieli Cię od rozpoczęcia
                networking z LetsNet:</p>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <TextField type="password"
                           errorText={this.state.error}
                           onChange={(event) => this.handleInputType(event)}
                           floatingLabelText="Ustaw hasło"
                           fullWidth={true}/>
            </form>
            {this.state.showOkButton ?
                <RaisedButton onTouchTap={(event) => this.handleSubmit(event)} label={Messages.save}
                              primary={true}/> : null}
            <p style={{position: 'fixed', bottom: 16, wordSpacing: '0.2rem'}}>Twoje konto zostanie przypisane<br/>
                do adresu <strong>{this.getEmailFromQuery()}</strong></p>
        </div>)
    }

    getEmailFromQuery() {
        return this.props.location.search.split("=")[1];
    }

    handleInputType(event) {
        const newPassword = event.target.value;
        if (newPassword.length < 5) {
            this.setState({error: Messages.passwordTooShort, showOkButton: false});
        } else {
            this.setState({error: null, password: newPassword, showOkButton: true})
        }
    }
}
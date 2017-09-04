import * as React from "react";
import {RaisedButton, TextField} from "material-ui";
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';
import {Redirect} from 'react-router-dom';

export default class Register extends React.Component {

    static propTypes = {
        handleRegister: PropTypes.func.isRequired,
        handleAlreadyRegistered: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            loading: true,
            redirect: false,
            error: null
        };
    }

    componentWillMount() {
        this.props.handleAlreadyRegistered(this.getEmailFromQuery()).then(providers => {
            if (providers.length === 0) {
                this.setState({loading: false});
            } else {
                this.setState({redirect: true});
            }
        });
    }

    handleSubmit(event) {
        if (!this.state.error) {
            this.props.handleRegister(this.getEmailFromQuery(), this.state.password)
                .catch((error) => this.setState({error: error.message}));
        }
        event.preventDefault();
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={`/?email=${this.getEmailFromQuery()}`} />
        }

        if (this.state.loading) {
            return <p/>;
        }

        return (<div style={{padding: 30}}>
            <h1>Zapraszamy na <br/>{this.props.title}!</h1>
            <p style={{fontSize: '1.6rem', wordSpacing: '0.2rem'}}>Jeszcze tylko jeden krok dzieli Cię od rozpoczęcia
                networkingu z LetsNet:</p>
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
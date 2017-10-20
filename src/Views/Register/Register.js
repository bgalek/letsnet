import * as React from "react";
import {RaisedButton, TextField} from "material-ui";
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';
import {Redirect} from 'react-router-dom';
import AreaSelect from "./AreaSelect";

export default class Register extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        areas: PropTypes.object.isRequired,
        handleRegister: PropTypes.func.isRequired,
        handleAlreadyRegistered: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            selectedArea: null,
            loading: true,
            redirect: false,
            error: null
        };
    }

    componentWillMount() {
        this.props.handleAlreadyRegistered(this.getDataFromQuery().email).then(providers => {
            if (providers.length === 0) {
                this.setState({loading: false});
            } else {
                this.setState({redirect: true});
            }
        });
    }

    handleSubmit(event) {
        if (!this.state.error) {
            const payload = this.getDataFromQuery();
            this.props.handleRegister(payload.email, this.state.password, {
                name: payload.name,
                lastname: payload.lastname,
                ticket: payload.ticket
            }, this.state.selectedArea).catch((error) => this.setState({error: error.message}));
        }
        event.preventDefault();
    }

    render() {
        const payload = this.getDataFromQuery();
        if (this.state.redirect) {
            const url = this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf("/"));
            return <Redirect to={`${url}?email=${payload.email}`}/>
        }

        if (this.state.loading) {
            return <p/>;
        }

        return (<div style={{padding: 30}}>
            <h1>Zapraszamy na <br/>{this.props.title}!</h1>
            <p style={{
                fontSize: '1.6rem',
                wordSpacing: '0.2rem'
            }}>{payload.name} {payload.lastname}, {Messages.onlyOneMoreStepToStart}</p>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <AreaSelect
                    value={this.state.selectedArea}
                    areas={this.props.areas}
                    onChange={(event, index, value) => this.setState({selectedArea: value})}
                />
                <TextField
                    type="password"
                    errorText={this.state.error}
                    onChange={(event) => this.handleInputType(event)}
                    floatingLabelText="ustaw hasło"
                    fullWidth={true}/>
            </form>
            {this.state.showOkButton ?
                <RaisedButton
                    onTouchTap={(event) => this.handleSubmit(event)}
                    label={Messages.save}
                    primary={true}/> : null}
            <p style={{position: 'fixed', bottom: 16, wordSpacing: '0.2rem'}}>
                {Messages.yourAccountWillBeAssignedTo}
                <strong> {payload.email}</strong>
            </p>
        </div>)
    }

    getDataFromQuery() {
        const data = this.props.location.search.split("=")[1];
        return JSON.parse(decodeURIComponent(atob(data)));
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
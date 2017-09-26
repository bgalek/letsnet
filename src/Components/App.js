// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch, withRouter} from 'react-router-dom';
import 'moment/locale/pl';
import Messages from "../Messages";
import {Profile as ProfileModel} from '../Models';
import {Loading, Register, Login,} from '../Views';
import ConferenceController from "./Controllers/ConferenceController";
import ProfileController from "./Controllers/ProfileController";
import LandingPageController from "./Controllers/LandingPageController";

class App extends Component {

    state = {
        title: Messages.appName,
        conferences: [],
        contacts: [],
        isLoading: true,
        isLoggedIn: false,
        profile: {},
        theme: {},
        logo: '',
    };

    getChildContext() {
        return {profile: this.state.profile};
    }

    static childContextTypes = {
        profile: PropTypes.object
    };

    componentWillMount() {
        const {auth} = this.props;

        auth.on('userNotLogged', () => this.setState({
            isLoggedIn: false
        }));

        auth.on('userLoggedIn', (user, userInfo) => this.setState({
                isLoggedIn: true,
                profile: new ProfileModel(user, userInfo),
                contacts: userInfo.contacts || {}
            }
        ));

        auth.on('conferencesLoaded', (conferences) => {
            this.setState({isLoading: false, conferences});
        });
    }

    render() {
        const {actions} = this.props.auth;
        if (this.state.isLoading) return <Loading/>;
        if (!this.state.isLoggedIn) return this.renderLoginForm();
        return (
            <Switch>
                <ConferenceController path="/conference/:conferenceId" conferences={this.state.conferences} actions={actions} contacts={this.state.contacts}/>
                <ProfileController path="/profile" actions={actions}/>
                <LandingPageController conferences={this.state.conferences}/>
            </Switch>
        );
    }

    renderLoginForm() {
        const {actions} = this.props.auth;
        return (
            <Switch>
                <Route path="/conference/:conferenceId/register" exact render={(props) =>
                    <Register
                        title={this.state.conferences.find(it => it._id === props.match.params.conferenceId).title}
                        logo={this.state.logo}
                        handleRegister={actions.register}
                        handleAlreadyRegistered={actions.userAlreadyRegistered}
                        location={props.location}/>}/>
                <Route render={(props) => <Login title={this.state.title} logo={this.state.logo}
                                                 handleLogin={actions.login} location={props.location}/>}/>
            </Switch>
        );
    }
}

export default withRouter(App);
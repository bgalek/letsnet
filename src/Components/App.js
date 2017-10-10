// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {Snackbar} from "material-ui";
import 'moment/locale/pl';
import Messages from "../Messages";
import {Profile as ProfileModel} from '../Models';
import {Loading, Register, Login} from '../Views';
import ConferenceController from "./Controllers/ConferenceController";
import ProfileController from "./Controllers/ProfileController";
import LandingPageController from "./Controllers/LandingPageController";

export default class App extends Component {

    state = {
        title: Messages.appName,
        conferences: [],
        contacts: [],
        isLoading: true,
        isLoggedIn: false,
        profile: {},
        theme: {},
        logo: '',
        message: ''
    };

    getChildContext() {
        return {
            profile: this.state.profile,
            messaging: {
                showMessage: (text) => this.setState({message: text})
            },
            database: this.state.database
        };
    }

    static childContextTypes = {
        database: PropTypes.object,
        profile: PropTypes.object,
        messaging: PropTypes.object
    };

    componentWillMount() {
        const {auth} = this.props;

        auth.on('userNotLogged', () => this.setState({
            isLoggedIn: false
        }));

        auth.on('userLoggedIn', (user, userInfo) => this.setState({
                isLoggedIn: true,
                profile: new ProfileModel(user, userInfo),
                contacts: userInfo.contacts || {},
                database: auth.database
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
            <div>
                <Switch>
                    <ConferenceController path="/conference/:conferenceId" conferences={this.state.conferences}
                                          actions={actions} contacts={this.state.contacts}/>
                    <ProfileController path="/profile" actions={actions}/>
                    <LandingPageController conferences={this.state.conferences}/>
                </Switch>
                <Snackbar style={{bottom: 58, zIndex: 0}} contentStyle={{bottom: 58}} bodyStyle={{bottom: 58}}
                          open={this.state.message.length > 0}
                          message={this.state.message}
                          autoHideDuration={4000}
                          onRequestClose={() => this.setState({message: ''})}
                />
            </div>
        );
    }

    renderLoginForm() {
        const {actions} = this.props.auth;
        return (
            <Switch>
                <Route path="/conference/:conferenceId/register" exact render={(props) => {
                    const conference = this.state.conferences.find(it => it._id === props.match.params.conferenceId);
                    return (<Register
                        title={conference.title}
                        areas={conference.areas}
                        logo={this.state.logo}
                        handleRegister={this.handleRegister(actions, conference.id)}
                        handleAlreadyRegistered={actions.userAlreadyRegistered}
                        location={props.location}/>);
                }}/>
                <Route render={(props) => <Login title={this.state.title} logo={this.state.logo}
                                                 handleLogin={actions.login} location={props.location}/>}/>
            </Switch>
        );
    }

    handleRegister(actions, conferenceId) {
        return (username, password, metadata, area) => actions.register(username, password, metadata).then(user => {
            actions.addAttendee(conferenceId, {id: user.uid, area, name: metadata.name, lastname: metadata.lastname});
            return user;
        });
    }
}
// @flow
import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import 'moment/locale/pl';
import Messages from "../Messages";
import {Profile as ProfileModel} from '../Models';
import {AuthenticatedBar, BottomMenu} from '../Components';
import {
    Loading,
    Profile,
    Register,
    Login,
    Networking,
    Contacts,
    LandingPage
} from '../Views';
import Home from "../Views/Home/Home";
import {Redirect} from "react-router";

class App extends Component {

    state = {
        title: Messages.appName,
        conferences: [],
        contacts: [],
        isLoading: true,
        isLoggedIn: false,
        profile: {},
        logo: '',
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

        auth.on('conferencesLoaded', (conferences) => this.setState({isLoading: false, conferences}));
    }

    render() {
        const {profile} = this.state;
        const {actions} = this.props.auth;

        if (this.state.isLoading) return <Loading/>;
        if (!this.state.isLoggedIn) return this.renderLoginForm();
        return (
            <div>
                <AuthenticatedBar title={this.state.title} profile={this.state.profile}/>
                <Switch>
                    <Route path="/conference/:conferenceId" render={(props) => {
                        const conferenceId = props.match.params.conferenceId;
                        return <div>
                            <Switch>
                                <Route path={`/conference/${conferenceId}`} exact={true} render={(props) =>
                                    <Redirect to={"/conference/" + conferenceId + "/home"}/>
                                }/>
                                <Route path={`/conference/${conferenceId}/home`} exact={true} render={(props) => <Home
                                    welcomeScreen={this.state.conferences.find(it => it._id === conferenceId).welcomeScreen}
                                    schedule={this.state.conferences.find(it => it._id === conferenceId).schedule}
                                />}
                                />
                                <Route path={`/conference/${conferenceId}/networking`} exact={true} render={(props) =>
                                    <Networking/>
                                }/>
                                <Route path={`/conference/${conferenceId}/contacts`} exact={true} render={(props) =>
                                    <Contacts contacts={this.state.contacts} handleAddContact={actions.addContact}/>
                                }/>
                                <Redirect to={{pathname: '/'}}/>
                            </Switch>
                            <BottomMenu baseUrl={`/conference/${conferenceId}`}/>
                        </div>;
                    }
                    }/>
                    <Route path="/profile" render={(props) =>
                        <Profile profile={profile} handleLogout={actions.logout}
                                 handleUpdateProfile={actions.updateProfile}/>}
                    />
                    <Route
                        render={props => <LandingPage history={props.history} conferences={this.state.conferences}/>}/>
                </Switch>
            </div>
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
// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import 'moment/locale/pl';
import {AuthenticatedBar, BottomMenu} from '../../Components';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {MuiThemeProvider} from "material-ui";
import Redirect from "react-router-dom/es/Redirect";
import {
    Home,
    Networking,
    Contacts,
    Profile
} from '../../Views';
import Talk from "../../Views/Talk/Talk";

export default class ConferenceController extends Component {
    static contextTypes = {
        profile: PropTypes.object
    };

    render() {
        return (
            <Route path="/conference/:conferenceId" render={(props) => {
                const conferenceId = props.match.params.conferenceId;
                const conference = this.props.conferences.find(it => it._id === conferenceId);
                return (
                    <MuiThemeProvider muiTheme={getMuiTheme(conference.theme)}>
                        <div>
                            <AuthenticatedBar title={conference.title} logo={conference.logo}/>
                            <Switch>
                                <Route path={`/conference/${conferenceId}`} exact={true} render={(props) => <Redirect to={"/conference/" + conferenceId + "/home"}/>}/>
                                <Route path={`/conference/:conferenceId/home`} exact={true} render={(props) => <Home
                                           welcomeScreen={conference.welcomeScreen}
                                           schedule={conference.schedule}
                                       />}
                                />
                                <Route path={`/conference/:conferenceId/networking`} exact={true}
                                       render={(props) =>
                                           <Networking attendees={conference.attendees} handleAddContact={this.props.actions.addContact} />
                                       }/>
                                <Route path={`/conference/:conferenceId/contacts`} exact={true}
                                       render={(props) =>
                                           <Contacts contacts={this.props.contacts} handleAddContact={this.props.actions.addContact} handleRemoveContact={this.props.actions.removeContact} areas={conference.areas}/>
                                       }/>
                                <Route path={`/conference/:conferenceId/profile`} exact={true}
                                       render={(props) =>
                                           <Profile profile={this.context.profile} handleLogout={this.props.actions.logout}
                                                    handleUpdateProfile={this.props.actions.updateProfile}/>
                                       }/>
                                <Route path={`/conference/:conferenceId/talk/:talkId`} render={(props) => <Talk schedule={conference.schedule} />} />
                                <Redirect to={{pathname: '/'}}/>
                            </Switch>
                            <BottomMenu baseUrl={`/conference/${conferenceId}`}/>
                        </div>
                    </MuiThemeProvider>
                );
            }}/>
        );
    }
}
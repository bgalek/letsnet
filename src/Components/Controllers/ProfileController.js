import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route} from 'react-router-dom';
import 'moment/locale/pl';
import Profile from "../../Views/Profile/Profile";

export default class ProfileController extends Component {

    static contextTypes = {
        profile: PropTypes.object
    };

    render() {
        return (
            <Route path="/profile" render={() => {
                return (
                    <Profile profile={this.context.profile} handleLogout={this.props.actions.logout}
                             handleUpdateProfile={this.props.actions.updateProfile}/>
                );
            }}/>
        );
    }
}
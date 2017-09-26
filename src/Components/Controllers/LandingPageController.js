import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route} from 'react-router-dom';
import 'moment/locale/pl';
import {AuthenticatedBar} from '../../Components';
import LandingPage from "../../Views/LandingPage/LandingPage";

export default class LandingPageController extends Component {

    static contextTypes = {
        profile: PropTypes.object
    };

    render() {
        return (
            <Route render={props => {
                return (
                    <div>
                        <AuthenticatedBar title="Let's net landing page" profile={this.context.profile}/>
                        <LandingPage history={props.history} conferences={this.props.conferences}/>
                    </div>);
            }}/>
        );
    }
}
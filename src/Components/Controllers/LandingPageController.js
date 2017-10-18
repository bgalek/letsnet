import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route} from 'react-router-dom';
import 'moment/locale/pl';
import LandingPage from "../../Views/LandingPage/LandingPage";
import AnonymousAppBar from "../ApplicationBar/AnonymousBar";

export default class LandingPageController extends Component {

    static contextTypes = {
        profile: PropTypes.object
    };

    render() {
        return (
            <Route render={props => {
                return (
                    <div>
                        <AnonymousAppBar title="Let's net" profile={this.context.profile}/>
                        <LandingPage history={props.history} conferences={this.props.conferences}/>
                    </div>);
            }}/>
        );
    }
}
// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RaisedButton} from "material-ui";
import Messages from "../../Messages";

export default class InviteActionButton extends Component {

    static contextTypes = {
        messaging: PropTypes.object
    };

    handleClick = () => {
        this.context.messaging.showMessage(Messages.invitationSent);
    };

    render() {
        return (
            <RaisedButton onTouchTap={this.handleClick} primary={true} label={Messages.invite}/>
        );
    }
}
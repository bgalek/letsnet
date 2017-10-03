// @flow
import React, {Component} from 'react';
import Messages from "../../Messages";

export default class InvitationsTab extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}><h3>{Messages.noInvitations}</h3></div>
        );
    }
}
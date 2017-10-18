// @flow
import React, {Component} from 'react';
import Messages from "../../Messages";
import PropTypes from "prop-types";
import moment from "moment";

export default class InvitationsTab extends Component {
    static contextTypes = {
        profile: PropTypes.object,
        database: PropTypes.object
    };

    constructor() {
        super();
        this.state = {
            invitations: []
        }
    }

    componentDidMount() {
        this.context.database.ref(`/users/${this.context.profile.id}/invitations/sent`).on('value', (snapshot) => {
            this.setState({invitations: Object.values(snapshot.val())});
        });
    }

    render() {
        const list = this.state.invitations.map((invitation, index) => <div key={index}>do {invitation.receiver} o {moment(invitation.timestamp).fromNow()}</div>);
        return (
            <div style={{textAlign: 'center'}}>
                {list.length ? list : <h3>{Messages.noInvitations}</h3>}
            </div>
        );
    }
}
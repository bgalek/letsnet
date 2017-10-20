// @flow
import React, {Component} from 'react';
import Messages from "../../Messages";
import PropTypes from "prop-types";
import {Card, CardHeader, Avatar, CardActions, FlatButton} from "material-ui";
import moment from "moment";
import PersonListItem from "../../Components/PersonListItem/PersonListItem";

export default class InvitationsTab extends Component {
    static contextTypes = {
        profile: PropTypes.object,
        database: PropTypes.object,
        handleAddContact: PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            invitations: []
        };
    }

    componentDidMount() {
        this.context.database.ref(`/users/${this.context.profile.id}/invitations/received`).on('value', (snapshot) => {
            const invitations = Object.keys(snapshot.val() || []).map(id => Object.assign({id}, snapshot.val()[id]));
            this.setState({invitations: invitations});
        });
    }

    acceptInvitation(invitation) {

        this.context.database.ref(`/users/${this.context.profile.id}/contacts`).push()
            .set({
                userId: invitation.from,
                invitation: invitation
            });
        this.context.database.ref(`/users/${invitation.from}/contacts`).push()
            .set({
                userId: this.context.profile.id,
                invitation: {
                    id: this.context.profile.id,
                    fromEmail: this.context.profile.email,
                    sender: `${this.context.profile.name} ${this.context.profile.lastName}`
                }
            });
        this.declineInvitation(invitation);
    }

    declineInvitation(invitation) {
        this.context.database.ref(`/users/${this.context.profile.id}/invitations/received/${invitation.id}`)
            .remove()
            .catch((error) => {
                console.log("Invitation remove failed: " + error.message);
            });
    }

    render() {
        const invitationCards = this.state.invitations.map((invitation, index) => {
            return (
                <Card key={index} style={{margin: 20}}>
                    <CardHeader
                        title={invitation.sender}
                        subtitle={'zaproszenie do networkingu ∙' + moment(invitation.timestamp).fromNow()}
                        avatar={<Avatar size={50}>{PersonListItem.getInitials(invitation.sender)}</Avatar>}
                    />
                    <CardActions style={{textAlign: 'right'}}>
                        <FlatButton label={Messages.decline} onClick={() => {
                            this.declineInvitation(invitation)
                        }}/>
                        <FlatButton primary={true} label={Messages.accept}
                                    onTouchTap={() => this.acceptInvitation(invitation)}/>
                    </CardActions>
                </Card>
            );
        });
        return (
            <div>
                {(invitationCards.length) ? invitationCards :
                    <h3 style={{textAlign: 'center'}}>{Messages.noInvitations}</h3>}
            </div>
        );
    }
}
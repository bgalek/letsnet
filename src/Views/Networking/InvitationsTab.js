// @flow
import React, {Component} from 'react';
import Messages from "../../Messages";
import PropTypes from "prop-types";
import {Card, CardHeader, Avatar, CardActions, FlatButton} from "material-ui";
import moment from "moment";

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
            if (snapshot.val()) {
                let invitations = Object.keys(snapshot.val())
                    .map(it => {
                        let invitation = snapshot.val()[it];
                        return {
                            id: it,
                            from: invitation.from,
                            sender: invitation.sender,
                            timestamp: invitation.timestamp
                        }
                    });
                this.setState({invitations: invitations});
            }
        });
    }

    static getInitials(name) {
        let names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    addToContacts(userId, invitationId) {
        this.removeInvitation(invitationId);
        let userRef = this.context.database.ref(`/users/${userId}`);
        userRef.on('value', (dataSnapshot) => {
            let contact = {
                name: dataSnapshot.val().name + ' ' + dataSnapshot.val().lastname,
                companyName: dataSnapshot.val().companyName,
                phoneNumber: dataSnapshot.val().phoneNumber,
                position: dataSnapshot.val().position,
                email: ''
            };
            this.props.handleAddContact(contact);
        });
    }

    removeInvitation(invitationId) {
        let invitationRef = this.context.database.ref(`/users/${this.context.profile.id}/invitations/received/${invitationId}`);
        invitationRef.remove()
            .then(() => { console.log("Invitation remove succeeded.") })
            .catch((error) => {
                console.log("Invitation remove failed: " + error.message)
            });
    }

    render() {
        const invitationCards = this.state.invitations.map((invitation, index) => {
            return (
            <Card key={index} style={{margin: 20}}>
                <CardHeader
                    title={invitation.sender}
                    subtitle={'zaproszenie do networkingu ∙' + moment(invitation.timestamp).fromNow()}
                    avatar={<Avatar size={50}>{InvitationsTab.getInitials(invitation.sender)}</Avatar>}
                />
                <CardActions style={{textAlign: 'right'}}>
                    <FlatButton label={Messages.decline} onClick={() => {this.removeInvitation(invitation.id)}}/>
                    <FlatButton primary={true} label={Messages.accept} onTouchTap={() => this.addToContacts(invitation.from, invitation.id)} />
                </CardActions>
            </Card>
            );
        });
        return (
            <div>
                {(invitationCards.length) ? invitationCards : <h3 style={{ textAlign: 'center'}}>{Messages.noInvitations}</h3>}
            </div>
        );
    }
}
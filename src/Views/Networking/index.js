// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Tab, Tabs} from 'material-ui';
import Messages from '../../Messages';
import InvitationsTab from './InvitationsTab';
import PeopleTab from "./PeopleBrowser";

export default class Networking extends Component {

    static propTypes = {
        attendees: PropTypes.object.isRequired
    };

    static contextTypes = {
        profile: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            showCamera: false
        };
    }

    handleChange(value) {
        if (value === 'scan') this.setState({showCamera: true});
        else this.setState({showCamera: false});
    };

    makePeople() {
        const {attendees} = this.props;
        return Object.keys(attendees)
            .map(it => {
                const attendee = attendees[it];
                return {
                    id: attendee.id,
                    name: `${attendee.name} ${attendee.lastname}`,
                    area: attendee.area
                }
            }).filter(it => it.id !== this.context.profile.id);
    }

    render() {
        return (
            <Tabs value={this.state.selectedIndex} onChange={(val) => this.handleChange(val)}>
                <Tab label={Messages.browse} value="browse">
                    <PeopleTab people={this.makePeople()}/>
                </Tab>
                <Tab label={Messages.invitations} value="invitations">
                    <InvitationsTab/>
                </Tab>
            </Tabs>
        );
    }
}
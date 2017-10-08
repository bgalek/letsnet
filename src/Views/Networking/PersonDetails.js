// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../Components/Card/Card";
import {Avatar, Divider} from "material-ui";
import PersonListItem from "../../Components/PersonListItem/PersonListItem";
import InviteActionButton from "./InviteActionButton";

export default class PersonDetails extends Component {

    static propTypes = {
        person: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Card>
                <Avatar size={96} style={{margin: '0 auto'}}>
                    {PersonListItem.getInitials(this.props.person.name)}
                </Avatar>
                <p style={{textAlign: 'center'}}>{this.props.person.name}<br/>
                    <small>{this.props.person.area}</small>
                </p>
                <Divider/>
                <InviteActionButton/>
            </Card>
        );
    }
}
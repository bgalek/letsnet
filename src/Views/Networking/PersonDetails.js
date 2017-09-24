// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../Components/Card/Card";
import {Avatar} from "material-ui";

export default class PersonDetails extends Component {

    static propTypes = {
        person: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Card>
                <Avatar size={100} style={{margin: '0 auto'}} src="https://www.gravatar.com/avatar/c0f5883d294ce84ed5f6e01a4f0f9d63"/>
                <p>{this.props.person.name}</p>
            </Card>
        );
    }
}
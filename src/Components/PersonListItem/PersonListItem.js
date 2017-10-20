// @flow
import React from 'react';
import {Avatar, ListItem} from "material-ui";
import PropTypes from 'prop-types';

export default class PersonListItem extends ListItem {
    static propTypes = {
        person: PropTypes.object.isRequired,
    };

    render() {
        const props = Object.assign({}, {
            secondaryText: this.props.person.position,
            primaryText: this.props.person.name,
            leftAvatar: <Avatar style={{left: 8}}>{PersonListItem.getInitials(this.props.person.name)}</Avatar>
        }, this.props);
        delete props.person;
        return (<ListItem {...props}/>)
    }

    static getInitials(name) {
        const split = name.split(" ");
        return (split.length > 1) ? split[0][0] + split[1][0] : split[0][0];
    }
}
// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../Components/Card/Card";

export default class BackButton extends Component {

    static propTypes = {
        people: PropTypes.array.isRequired,
    };

    render() {
        return (
            <Card>
                <p>{this.props.person.name}</p>
            </Card>
        );
    }
}
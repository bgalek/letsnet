// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Messages from "../../Messages";
import {FlatButton} from "material-ui";
import {NavigationArrowBack} from "material-ui/svg-icons";

export default class BackButton extends Component {

    static propTypes = {
        handleClick: PropTypes.func.isRequired,
    };

    render() {
        return (
            <FlatButton style={{margin: 10}}
                        label={Messages.back}
                        icon={<NavigationArrowBack/>}
                        onTouchTap={this.props.handleClick}/>
        );
    }
}
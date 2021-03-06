// @flow
import React, {Component} from 'react';
import {AppBar} from 'material-ui';
import logo from './letsnet-logo.svg';

export default class AnonymousAppBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title} iconElementRight={<img alt="logo lets net" style={{width: 48, height: 48, paddingRight: 16, boxShadow: 0}} src={logo}/>}
                    showMenuIconButton={false} style={{position: 'sticky', top: 0}}
                    onRightIconButtonTouchTap={this.handleLogin}>
                {this.props.children}
            </AppBar>
        )
    }
}
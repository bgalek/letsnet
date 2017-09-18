// @flow
import React, {Component} from 'react';
import {AppBar} from 'material-ui';

export default class AnonymousAppBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title} iconElementRight={<img alt="logo lets net" style={{width: 48, height: 48, paddingRight: 16, 'box-shadow': 0}} src={this.props.logo}/>}
                    showMenuIconButton={false} style={{position: 'sticky', top: 0}}
                    onRightIconButtonTouchTap={this.handleLogin}>
                {this.props.children}
            </AppBar>
        )
    }
}
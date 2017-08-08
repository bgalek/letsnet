// @flow
import React, {Component} from 'react';
import {AppBar, IconButton} from 'material-ui';
import SocialPerson from 'material-ui/svg-icons/social/person';

export default class AnonymousAppBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title} iconElementRight={<img alt="logo lets net" style={{width: 48, height: 48, paddingRight: 16}} src={this.props.logo}/>}
                    showMenuIconButton={false} style={{position: 'sticky', top: 0}}
                    onRightIconButtonTouchTap={this.handleLogin}>
                {this.props.children}
            </AppBar>
        )
    }
}
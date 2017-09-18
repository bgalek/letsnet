// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { BottomNavigation, BottomNavigationItem, Paper } from 'material-ui';
import { ActionEvent, SocialPeople, MapsPersonPin, EditorModeComment } from 'material-ui/svg-icons';
import Messages from "../../Messages";

class BottomMenuComponent extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    goTo = (route) => {
        this.props.history.push(route);
    };

    render() {
        const menuOptions = [
            { label: Messages.event, icon: <ActionEvent/>, link: '/' },
            { label: Messages.networking, icon: <EditorModeComment/>, link: '/networking' },
            { label: Messages.contacts, icon: <SocialPeople/>, link: '/contacts' },
            { label: Messages.profile, icon: <MapsPersonPin/>, link: '/profile' },
        ];

        const activeOptionIndex = menuOptions.findIndex(option => this.props.location.pathname.startsWith(option.link));

        return (
            <Paper zDepth={1} style={{position: 'fixed', bottom: 0, zIndex: 1000, width: '100%'}}>
                <BottomNavigation selectedIndex={activeOptionIndex}>
                    {menuOptions.map(option =>
                        <BottomNavigationItem
                            key={option.link}
                            label={option.label}
                            icon={option.icon}
                            onTouchTap={() => this.goTo(option.link)}
                        />
                    )}
                </BottomNavigation>
            </Paper>
        );
    }
}

export default withRouter(BottomMenuComponent);
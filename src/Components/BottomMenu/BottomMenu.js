// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { BottomNavigation, BottomNavigationItem, Paper } from 'material-ui';
import { ActionHome, ActionSchedule, CommunicationLocationOn, AvVideocam } from 'material-ui/svg-icons';
import Messages from "../../Messages";

class BottomMenuComponent extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    goTo = (route: string) => {
        this.props.history.push(route);
    };

    render() {
        const menuOptions = [
            { label: 'Główna', icon: <ActionHome/>, link: '/home' },
            { label: Messages.schedule, icon: <ActionSchedule/>, link: '/schedule' },
            { label: 'Stream', icon: <AvVideocam/>, link: '/stream' },
            { label: 'Mapa', icon: <CommunicationLocationOn/>, link: '/info' },
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
// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {BottomNavigation, BottomNavigationItem, Paper} from 'material-ui';
import {ActionEvent, SocialPeople, MapsPersonPin, EditorModeComment} from 'material-ui/svg-icons';
import Messages from "../../Messages";

export default class BottomMenuComponent extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {
        baseUrl: PropTypes.string.isRequired
    };

    goTo = (route) => {
        this.context.router.history.push(route);
    };

    render() {
        const menuOptions = [
            {label: Messages.event, icon: <ActionEvent/>, link: '/home'},
            {
                label: Messages.networking,
                icon: <EditorModeComment/>,
                link: '/networking'
            },
            {label: Messages.contacts, icon: <SocialPeople/>, link: '/contacts'},
            {label: Messages.profile, icon: <MapsPersonPin/>, link: '/profile'},
        ];

        const activeOptionIndex = menuOptions.findIndex(option => this.context.router.history.location.pathname.includes(option.link));
        return (
            <Paper className="bottomBar" zDepth={1} style={{position: 'fixed', bottom: 0, zIndex: 1000, width: '100%'}}>
                <BottomNavigation selectedIndex={activeOptionIndex}>
                    {menuOptions.map(option =>
                        <BottomNavigationItem
                            key={option.link}
                            label={option.label}
                            icon={option.icon}
                            onTouchTap={() => this.goTo(this.props.baseUrl + option.link)}
                        />
                    )}
                </BottomNavigation>
            </Paper>
        );
    }
}
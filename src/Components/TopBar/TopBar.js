import React, {Component} from 'react';
import './TopBar.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../config';

// @flow
class TopBar extends Component {

    static propTypes = {
        menuItems: PropTypes.array.isRequired
    };

    state = {
        open: false
    };

    handleClose = () => this.setState({open: false});

    render() {
        const menuItems = this.props.menuItems.filter(it => !it.props.exact)
            .map((route, index) => (
                <MenuItem onTouchTap={this.handleClose} key={index}>
                    <Link to={route.props.path}>{route.props.label}</Link>
                </MenuItem>
            ));

        return (
            <div>
                <AppBar title={config.appName} iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.openDrawer}/>
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    {menuItems}
                </Drawer>
            </div>
        );
    }

    openDrawer = () => {
        this.setState({open: true});
    }
}

export default TopBar;

// @flow
import React, {Component} from 'react';
import './TopBar.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

class About extends Component {

    state = {
        open: false
    };

    render() {
        return (
            <div>
                <AppBar title="Let's net" iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.openDrawer}/>
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <MenuItem>
                        <Link to="/">Home</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/about">About</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/scanner">Scanner</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/contacts">Contacts</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/ticket">Ticket</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/schedule">Schedule</Link>
                    </MenuItem>
                </Drawer>
            </div>
        );
    }

    openDrawer = () => {
        this.setState({open: true});
    }
}

export default About;

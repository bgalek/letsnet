import React, {Component} from 'react';
import {Col, Row, Grid} from "react-flexbox-grid";
import './TopBar.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../config';
import {Paper} from "material-ui";
import logo from './letsnet-logo.svg';


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
        const menuItems = this.props.menuItems
            .filter(menuItem => menuItem.props.label)
            .map((route, index) => (
                    <MenuItem className="menu-item" leftIcon={route.props.icon} onClick={this.handleClose} key={index}>
                        <Link to={route.props.path}>{route.props.label}</Link>
                    </MenuItem>
                )
            );

        return (
            <AppBar title="SWWAW Conference" iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.openDrawer}>
                <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <Grid>
                        <Row>
                            <Col>
                                <Paper className="profile-container" style={{backgroundColor: config.palette.primary1Color}} zDepth={2}>
                                    <img className="logo" src={logo} alt="Logo"/>
                                </Paper>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginLeft: 20, marginTop: 20}}>
                                {menuItems}
                            </Col>
                        </Row>
                    </Grid>
                </Drawer>
            </AppBar>
        );
    }

    openDrawer = () => {
        this.setState({open: true});
    }
}

export default TopBar;

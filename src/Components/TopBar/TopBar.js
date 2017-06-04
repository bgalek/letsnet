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
import logo from './logo.svg';
import {grey700} from "material-ui/styles/colors"

const style = {
    height: 150,
    width: 200,
    margin: 0,
};


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
            .map((route, index) => (
                <MenuItem className="menu-item" onTouchTap={this.handleClose} key={index}>
                    <Link to={route.props.path}>{route.props.label}</Link>
                </MenuItem>
            ));

        return (
            <div>
                <AppBar title={config.appName} iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.openDrawer}/>
                <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <Grid>
                        <Row>
                            <Col>
                                <Paper className="profile-container" style={{backgroundColor: grey700}} zDepth={2}>
                                    <img className="logo" src={logo} alt="Logo" />
                                </Paper>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {menuItems}
                            </Col>
                        </Row>
                    </Grid>
                </Drawer>
            </div>
        );
    }

    openDrawer = () => {
        this.setState({open: true});
    }
}

export default TopBar;

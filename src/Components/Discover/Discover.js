import React, {Component} from 'react';
import discoverMock from './discover.png';
import Contacts from "../Contacts/Contacts";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Tabs, Tab} from "material-ui";

class Discover extends Component {
    render() {
        return (
            <Tabs>
                <Tab label="Conferences">
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                                <img style={{width: '100%', marginTop: 20}} src={discoverMock} alt="people"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <img style={{width: '100%', marginTop: 20}} src={discoverMock} alt="people"/>
                            </Col>
                        </Row>
                    </Grid>
                </Tab>
                <Tab label="People">
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                                <Contacts/>
                            </Col>
                        </Row>
                    </Grid>
                </Tab>
            </Tabs>
        );
    }
}

export default Discover;

import React, {Component} from 'react';
import './Home.css';
import TicketCard from "../Cards/TicketCard";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Divider, Tab, Tabs} from "material-ui";
import scheduleMock from './schedule.png';

class Home extends Component {
    render() {
        return (
            <Tabs>
                <Tab label="Overview">
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                                <TicketCard />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <p>Next Speakers</p>
                                <Divider />
                            </Col>
                        </Row>
                    </Grid>
                </Tab>
                <Tab label="Schedule">
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                                <img style={{width: '100%', marginTop: 20}} src={scheduleMock} alt="schedule"/>
                            </Col>
                        </Row>

                    </Grid>
                </Tab>
                <Tab label="Speakers">
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                            </Col>
                        </Row>
                    </Grid>
                </Tab>
            </Tabs>
        );
    }
}

export default Home;
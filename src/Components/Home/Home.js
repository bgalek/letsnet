import React, {Component} from 'react';
import './Home.css';
import TicketCard from "../Cards/TicketCard";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Tab, Tabs} from "material-ui";
import scheduleMock from './schedule.png';
import speakersMock from './speakers.png';
import homeMore from './home.png';
import peopleMock from './people.png';

class Home extends Component {
    render() {
        console.log(this.props);
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
                                <img style={{width: '100%', marginTop: 20}} src={homeMore} alt="speakers"/>
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
                                <img style={{width: '100%', marginTop: 20}} src={speakersMock} alt="speakers"/>
                                <img style={{width: '100%', marginTop: 20}} src={speakersMock} alt="speakers"/>
                            </Col>
                        </Row>
                    </Grid>
                </Tab>
                <Tab label="People">
                    <Grid fluid>
                        <Row>
                            <Col xs={12}>
                                <img style={{width: '100%', marginTop: 20}} src={peopleMock} alt="speakers"/>

                            </Col>
                        </Row>
                    </Grid>
                </Tab>
            </Tabs>
        );
    }
}

export default Home;
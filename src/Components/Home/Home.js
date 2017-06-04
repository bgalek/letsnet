import React, {Component} from 'react';
import './Home.css';
import TicketCard from "../Cards/TicketCard";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Divider, Tab, Tabs} from "material-ui";

class Home extends Component {
    render() {
        return (
            <Tabs>
                <Tab label="Overview">
                    <Grid className="feed">
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
            </Tabs>
        );
    }
}

export default Home;
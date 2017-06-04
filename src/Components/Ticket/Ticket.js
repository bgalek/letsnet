import React, {Component} from 'react';
import './Ticket.css';
import ticketsMock from './tickets.png';
import {Col, Grid, Row} from "react-flexbox-grid";

class Ticket extends Component {

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <img style={{width: '100%', marginTop: 20}} src={ticketsMock} alt="tickets"/>
                    </Col>
                </Row>

            </Grid>
        );
    }
}

export default Ticket;
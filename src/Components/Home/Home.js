import React, {Component} from 'react';
import './Home.css';
import TicketCard from "../Cards/TicketCard";
import {Col, Grid, Row} from "react-flexbox-grid";
import {Tab, Tabs} from "material-ui";
import scheduleMock from './schedule.png';
import speakersMock from './speakers.png';
import homeMore from './home.png';
import peopleMock from './people.png';
import {Dialog, RaisedButton} from 'material-ui';
import config from './../../config'

class Home extends Component {

    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        let dialog;
        if (this.props.showWelcomeScreen) {
            dialog = <Dialog className="dialog"
                             title='Welcome to Lets Net!'
                             titleStyle={{color: config.palette.alternateTextColor}}
                             modal={false}
                             open={this.state.open}
                             onRequestClose={this.props.handleClose}>
                <h2>{this.props.match.params.name + " " + this.props.match.params.surname} </h2>
                <p>
                    We're happy to see you at&nbsp;
                    <strong>
                        Warsaw Startup Weekend #9!
                    </strong>
                </p>
                <p>
                    Let's net will help you to connect with other attendees and stay in touch after.
                </p>
                <Grid fluid>
                    <Row center="xs">
                        <Col xs={4}>
                            <RaisedButton style={{marginTop: 20} }
                                          backgroundColor={config.palette.primary3Color}
                                          labelStyle={{color: config.palette.alternateTextColor}}
                                          label="Explore" onTouchTap={this.handleClose}/>
                        </Col>
                    </Row>

                </Grid>
            </Dialog>;
        }

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
                    {dialog}
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
import React, {Component} from 'react';
import QrReader from 'react-qr-reader'
import {Col, Row, Grid} from "react-flexbox-grid";
import './Scanner.css';
import {Avatar, Dialog, FlatButton} from "material-ui";
import Person from "../../Models/Person";
import config from '../../config';



class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: new Person(),
            open: false
        }
    }

    handleOpen = (data) => {
        const person = new Person(data.firstName, data.lastName, data.email, data.phoneNumber, data.image, data.company, data.position);
        this.setState({open: true, person: person});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleScan(data) {
        if (data) {
            let person = JSON.parse(data);
            this.handleOpen(person);
        }
    }

    handleError(err) {
        console.error(err);
        throw err;
    }

    render() {
        const actions = [
            <FlatButton
                label="Ignore"
                primary={true}
                onTouchTap={this.handleClose}/>,
            <FlatButton
                label="Accept"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}/>,
        ];

        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (iOS) {
            return (<h3 className="iOS-message">iOS not yet supported</h3>)
        } else {
            return (
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            <div className="viewfinder">
                            </div>
                            <QrReader
                                delay={200}
                                style={{width: '100%'}}
                                onError={() => this.handleError}
                                onScan={(data) => this.handleScan(data)}
                                facingMode='rear'
                            />
                            <Dialog className="dialog"
                                    title={'Say hello to ' + this.state.person.firstName + '!'}
                                    titleStyle={{color: config.palette.alternateTextColor}}
                                    actions={actions}
                                    modal={false}
                                    open={this.state.open}
                                    onRequestClose={this.handleClose}>
                                <Avatar className="avatar"
                                        src={this.state.person.image}
                                        size={50}
                                />
                                <section className="user-info">
                                    <h4>{this.state.person.firstName + ' ' + this.state.person.lastName}</h4>
                                    <p>{this.state.person.position}</p>

                                    <ul className="user-list">
                                        <li>{this.state.person.company}</li>
                                        <li>{this.state.person.phoneNumber}</li>
                                        <li>{this.state.person.email}</li>
                                    </ul>
                                </section>
                            </Dialog>
                        </Col>
                    </Row>
                </Grid>
            )
        }
    }
}

export default Scanner;
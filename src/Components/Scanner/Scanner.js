import React, {Component} from 'react';
import QrReader from 'react-qr-reader'
import {Col, Row, Grid} from "react-flexbox-grid";
import './Scanner.css';
import {Avatar, Dialog, FlatButton} from "material-ui";
import Person from "../../Models/Person";

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: new Person(),
            open: false
        }
    }

    handleOpen = (data) => {
        const person = new Person(data.name, data.surname, data.email);
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

        const title = 'Say hello to ' + this.state.person.firstName + '!';

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

        console.log(this.state.person);

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
                            facingMode={'rear'}
                        />
                        <Dialog className="dialog"
                                title={'Say hello to ' + this.state.person.firstName + '!'}
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}>
                            <Avatar className="avatar"
                                    size={50}
                            />
                            <section className="user-info">
                                <h4>Krzysztof Szporer</h4>
                                <p>Software Developer</p>

                                <ul className="user-list">
                                    <li>Bosch</li>
                                    <li>+48999000111</li>
                                    <li>email@email.com</li>
                                </ul>
                            </section>
                        </Dialog>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Scanner;
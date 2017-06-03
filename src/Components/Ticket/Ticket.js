import React, {Component} from 'react';
import {Paper} from "material-ui";
import './Ticket.css';
import qr from './qr_example.svg';

class Ticket extends Component {

    render() {
        return (
            <div>
                <Paper className="QR-container" zDepth={1}>
                    <img src={qr} alt="QR code" />
                </Paper>
                <p>Great! Here is your ticket for SWWAW</p>
            </div>
        );
    }
}

export default Ticket;
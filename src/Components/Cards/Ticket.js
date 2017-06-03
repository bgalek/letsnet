import React, {Component} from 'react';
import {Paper} from "material-ui";
import './Ticket.css';
import qr from './qr_example.svg';

class TicketCard extends Component {

    render() {
        return (
            <div>
                <Paper className="QR-container" zDepth={1}>
                    <img src={qr} alt="QR code" />
                </Paper>
                <p>Great! Here is your ticket {this.props.name} for SWWAW</p>
            </div>
        );
    }
}

export default TicketCard;
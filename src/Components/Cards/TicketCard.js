import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {amber500, white} from 'material-ui/styles/colors'
import ReceiptIcon from 'material-ui/svg-icons/action/receipt';
import barcode from './barcode.svg'
import './TicketCard.css';

class TicketCard extends Component {
    static styles = {
        background: amber500,
        marginTop: '2rem'
    };

    render() {
        return (
            <Card className="cards__ticket" style={TicketCard.styles}>
                <CardHeader
                    title="TICKET"
                    subtitle="show it at the entrance"
                    titleColor={white}
                    avatar={<ReceiptIcon style={{height: '40px', width: '40px'}} color={white}/>}
                />
                <CardText>
                    <h2>Warsaw Startup Weekend</h2>
                    <h4>Relationship Management</h4>
                    <img style={{width: '100%', height: '40px'}} src={barcode} alt="ticket code"/>
                </CardText>
            </Card>
        );
    }
}

export default TicketCard;
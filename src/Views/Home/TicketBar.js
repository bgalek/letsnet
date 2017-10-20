import * as React from "react";
import Card from "../../Components/Card/Card";
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import Messages from "../../Messages";
import {PropTypes} from 'prop-types';

export default class TicketBar extends React.Component {

    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        enrolled: PropTypes.bool
    };

    render() {
        const {id, enrolled} = this.props;
        if (enrolled) return null;
        return (
            <Card style={{margin: 0, padding: '0px 20px'}}>
                <p>
                    <ActionReceipt style={{margin: '0px 6px -6px 0px'}}/>{Messages.yourTicket}
                    <strong style={{color: '#535353', float: 'right'}}>{id}</strong>
                </p>
            </Card>
        )
    }
}
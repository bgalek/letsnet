import * as React from "react";
import {PropTypes} from 'prop-types';
import TicketBar from "./TicketBar";
import ScheduleItem from "../Schedule/ScheduleItem";

export default class Home extends React.Component {

    static propTypes = {
        welcomeScreen: PropTypes.object.isRequired
    };

    render() {
        const {welcomeScreen, schedule} = this.props;
        // const nextRecords = schedule.findNext(new Date(), 5);
        const nextRecords = schedule.findAll(new Date());
        return (
            <div>
                <TicketBar ticketNumber="77777777777777"/>
                <h2>{welcomeScreen.title}</h2>
                <p style={{margin: '1.5em'}}>{welcomeScreen.description}</p>
                <h2>Agenda</h2>
                {nextRecords.map(item => <ScheduleItem key={item.id} item={item} hideDescription={true}/>)}
            </div>
        )
    }
}
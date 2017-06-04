import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {Tab, Tabs} from "material-ui/Tabs";

const scheduleList = require('./data.json');

export default class Schedule extends Component {

    renderTalks(scheduleItem) {
        return scheduleItem.sessions.map((session, index) =>
            <ListItem key={`${index}-${session.title}`} primaryText={session.hours +" - "+ session.title} secondaryText={session.subtitle}/>
        );
    }

    render() {
        return (
            <Tabs>
                {scheduleList.schedule.map((scheduleItem) =>
                    <Tab label={scheduleItem.day} key={scheduleItem.day}>
                        <List>{this.renderTalks(scheduleItem)}</List>
                    </Tab>)}
            </Tabs>
        );
    }
}
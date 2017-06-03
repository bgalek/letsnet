import React, {Component} from "react";
import {List, ListItem} from "material-ui/List";
import {Tab, Tabs} from "material-ui/Tabs";

const scheduleList = require('./data.json');

export default class Schedule extends Component {
    render() {
        return <div>
            <CustomList/>
        </div>
    }
}

class CustomList extends Component {
    render() {
        const schedules = scheduleList.schedule.map((scheduleItem) =>
            <Tab label={scheduleItem.day}>
                <List>
                    {scheduleItem.sessions.map(session => <ListItem primaryText={session.title}
                                                                    secondaryText={<p>{session.subtitle}</p>}/>)}

                </List>
            </Tab>
        );
        return <div>
            <Tabs>
                {schedules}
            </Tabs>
        </div>
    }
}
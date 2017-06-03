import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Schedule extends Component {
    render() {
        return <div>
            <p>{this.props.userName}</p>
            <CustomList/>
        </div>
    }
}

class CustomList extends Component {
    render() {
        const scheduleList = require('./data.json');
        const schedules = scheduleList.scheduleData.map((scheduleItem, i) =>
            <div key={scheduleItem.title+i}>
                <ListItem primaryText={scheduleItem.title} secondaryText={ <p>{scheduleItem.subtitle}</p> }/>
                <Divider inset={true}/>
            </div>
        );
        console.log(schedules);
        return <div>
            <List>
                {schedules}
            </List>
        </div>
    }
}
// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, CardHeader} from "material-ui";
import './ScheduleItem.css';
import Card from "../../Components/Card/Card";
import {
    PlacesFreeBreakfast,
    MapsRestaurantMenu,
    SocialLocationCity,
    ActionVerifiedUser,
    ActionSpeakerNotes,
    ActionFlightTakeoff,
    ActionFlightLand
} from 'material-ui/svg-icons';

export default class ScheduleItem extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {
        item: PropTypes.object.isRequired,
        hideDescription: PropTypes.bool,
        action: PropTypes.func
    };

    renderTechnicalTime() {
        const {title, type, start, end} = this.props.item;
        const style = {padding: '0', cursor: 'pointer'};
        return (
            <Card className="schedule-card" style={style}>
                <CardHeader
                    title={title}
                    subtitle={`${start} - ${end}`}
                    textStyle={{'padding': '0'}}
                    avatar={<Avatar icon={getIconForEventType(type)}/>}
                />
            </Card>)
            ;
    }

    renderPresentationDesc() {
        const {item} = this.props;
        const style = {padding: '0', cursor: 'pointer'};
        const conferenceId = this.context.router.route.match.params.conferenceId;
        return (
            <Card className="schedule-card" style={style}>
                <CardHeader title={item.title}
                            onTouchTap={() => this.context.router.history.push(`/conference/${conferenceId}/talk/${item.id}`)}
                            textStyle={{'padding': '0'}}
                            subtitle={`${item.start} - ${item.end} · ${item.speakers.map(speaker => speaker.name).join(', ')}`}
                            avatar={<span>{item.speakers.map(speaker => <Avatar key={speaker.name}
                                                                                className="speaker-avatar"
                                                                                src={speaker.photo}/>)}</span>}
                />
            </Card>
        );
    }

    render() {
        const {item} = this.props;
        return item.isTechnical() ? this.renderTechnicalTime() : this.renderPresentationDesc();
    }
}

const getIconForEventType = type => {
    return {
        registration: <ActionVerifiedUser/>,
        open: <ActionFlightLand/>,
        keynote: <ActionSpeakerNotes/>,
        coffeebreak: <PlacesFreeBreakfast/>,
        lunch: <MapsRestaurantMenu/>,
        party: <SocialLocationCity/>,
        close: <ActionFlightTakeoff/>
    }[type];
};

// @flow
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Avatar} from "material-ui";
import Card from "../../Components/Card/Card";

export default class Talk extends Component {

    static contextTypes = {
        router: PropTypes.object
    };


    render() {
        const talkId = this.context.router.route.match.params.talkId;
        const talk = this.props.schedule.findById(talkId);
        const {speakers} = talk;
        const avatars = <div>{speakers.map(speaker => <Avatar key={speaker.name} className="speaker-avatar" size={140}
                                                              src={speaker.photo}/>)}</div>;
        return (
            <Card className="talk" style={{textAlign: 'center'}}>
                {avatars}
                <h2>{speakers.map(speaker => <div key={speaker.name}>{speaker.name}</div>)}</h2>
                <h3>{talk.title}</h3>
                <p>{talk.content}</p>
            </Card>
        );
    }
}
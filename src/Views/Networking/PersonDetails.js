// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../Components/Card/Card";
import {Avatar, Divider} from "material-ui";
import PersonListItem from "../../Components/PersonListItem/PersonListItem";
import InviteActionButton from "./InviteActionButton";
import Chatroom from "../../Components/Chatroom/Chatroom";

export default class PersonDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInvited: false
        };
    }

    static propTypes = {
        person: PropTypes.object.isRequired,
        checkIfInvited: PropTypes.func.isRequired
    };

    static contextTypes = {
        profile: PropTypes.object,
    };

    componentDidMount() {
        this.props.checkIfInvited(this.props.person.id).then(isInvited => this.setState({isInvited}));
    }

    render() {
        return (
            <div>
                <Card>
                    <Avatar size={96} style={{margin: '0 auto'}}>
                        {PersonListItem.getInitials(this.props.person.name)}
                    </Avatar>
                    <p style={{textAlign: 'center'}}>{this.props.person.name}<br/>
                        <small>{this.props.person.area}</small>
                    </p>
                    <Divider/>
                    <InviteActionButton disabled={this.state.isInvited} person={this.props.person} onClick={() => this.setState({isInvited: true})}/>
                </Card>
                <Chatroom with={this.props.person}/>
            </div>
        );
    }
}
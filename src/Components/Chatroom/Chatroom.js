import React from 'react';
import ReactDOM from 'react-dom';
import Message from "./Message";
import {List, Subheader, TextField} from "material-ui";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import firebase from 'firebase';

class Chatroom extends React.Component {

    static contextTypes = {
        profile: PropTypes.object,
        database: PropTypes.object,
        messaging: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentWillMount() {
        const chatroomId = this.getChatroomId(this.props.with.id, this.context.profile.id);
        this.setState({chatroomId: chatroomId});
        this.context.database.ref(`/chats/${chatroomId}/`).limitToLast(10).once('value', snapshot => {
            this.setState({chats: Object.values(snapshot.val())});
        });
    }

    componentDidMount() {
        this.scrollToBot();
        const chatroomId = this.getChatroomId(this.props.with.id, this.context.profile.id);
        this.context.database.ref(`/chats/${chatroomId}/`).orderByChild('timestamp').startAt(Date.now()).on('child_added', snapshot => {
            const chatMessage = snapshot.val();
            let updated = this.state.chats.slice();
            updated.push(chatMessage);
            this.setState({chats: updated});
            if (chatMessage.sender !== this.context.profile.id) {
                this.context.messaging.showMessage('Nowa wiadomość od ' + chatMessage.from);
            }
        });
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        if (e) e.preventDefault();
        this.context.database.ref(`/chats/${this.state.chatroomId}`).push({
            sender: this.context.profile.id,
            from: `${this.context.profile.firstName} ${this.context.profile.lastName}`,
            to: this.props.with.name,
            content: this.state.msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({
            msg: ''
        });
    }

    render() {
        const {chats} = this.state;
        return (
            <div>
                <Card style={{overflowY: 'scroll', maxHeight: 250}} ref="chats">
                    <List>
                        <Subheader>Ostatnie wiadomości</Subheader>
                        {chats.map((chat, i) => <Message key={i} chat={chat} me={this.context.profile.id}/>)}
                    </List>
                </Card>
                <Card>
                    <form onSubmit={this.submitMessage}>
                        <TextField hintText="Wpisz wiadomość" value={this.state.msg}
                                   fullWidth={true} onChange={(e) => this.setState({msg: e.target.value})}/>
                    </form>
                </Card>
            </div>
        );
    }

    getChatroomId(a, b) {
        let res = "", l = Math.max(a.length, b.length);
        for (let i = 0; i < l; i += 4) res = ("000" + (parseInt(a.slice(-i - 4, -i || a.length), 16) ^ parseInt(b.slice(-i - 4, -i || b.length), 16)).toString(16)).slice(-4) + res;
        return res;
    }
}

export default Chatroom;
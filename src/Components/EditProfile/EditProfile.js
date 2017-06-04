import React, {Component} from 'react';
import './EditProfile.css';
import {Avatar, Card, CardActions, FlatButton, TextField} from "material-ui";

const style = {
    margin: 10,
}
class Profile extends Component {

    render() {
        return (
            <div className="container profile">
                <Avatar
                    size={80}
                    style={style}
                />
                <div>
                    <TextField
                        id="text-field-default"
                        defaultValue="Name Surname"
                        style={style}
                    /><br />
                    <TextField
                        id="text-field-default"
                        defaultValue="Occupation"
                        style={style}
                    /><br />
                    <TextField
                        id="text-field-default"
                        defaultValue="Company name"
                        style={style}
                    /><br />
                    <TextField
                        id="text-field-default"
                        defaultValue="E-mail"
                        style={style}
                    /><br />
                    <TextField
                        id="text-field-default"
                        defaultValue="Phone number"
                        style={style}
                    />
                </div>
                <Card className="buttons-container">
                    <CardActions>
                        <FlatButton label="UNDO" />
                        <FlatButton label="SAVE" />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Profile;
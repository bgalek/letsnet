import React, {Component} from 'react';
import './Profile.css';
import {Avatar, Card, CardActions, FlatButton, Paper, TextField} from "material-ui";

const style = {margin: 5};

class Profile extends Component {

    render() {
        return (
            <div className="profile-container">
                <Paper className="flex-container" zDepth={3}>
                    <Avatar
                        src="http://www.ruralagri   ventures.com/wp-content/uploads/2017/05/man-team.jpg"
                        size={60}
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
                </Paper>
                <Card>
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
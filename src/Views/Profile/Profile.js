// @flow
import React, { Component } from 'react';
import { Paper, RaisedButton, Avatar, FlatButton, TextField } from "material-ui";
import { PropTypes } from 'prop-types';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.state = { isEditable: false };
    }

    static propTypes = {
        handleLogout: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired
    };

    handleEditClick() {
        this.setState({ isEditable: true });
    }

    handleSaveClick() {
        this.setState({ isEditable: false });
        // perform save profile details to Firebase...
    }

    render() {
        const { profile } = this.props;
        const isEditable = this.state.isEditable;

        let editButton = null;
        if (isEditable) {
            // assign editable profile view
            editButton = <FlatButton label='Save' style={{ position: 'absolute', right: 0 }} onClick={this.handleSaveClick} />;
        } else {
            // assign static profile view
            editButton = <FlatButton label='Edit' style={{ position: 'absolute', right: 0 }} onClick={this.handleEditClick} />
        }

        return (
            <div>
                {editButton}
                <div style={{ padding: 30, margin: 30, textAlign: 'center' }}>
                    <Avatar src={profile.photoURL} size={150} />
                    <TextField disabled={!isEditable} defaultValue={profile.displayName} hintText='Name Surname' underlineShow={isEditable} inputStyle={{ textAlign: 'center', color: 'black', fontSize: 35 }} />
                    <TextField disabled={!isEditable} defaultValue={profile.email} hintText="E-mail" underlineShow={isEditable} inputStyle={{ textAlign: 'center', color: 'black' }} />
                    <TextField disabled={!isEditable} defaultValue={profile.position} hintText="Position" underlineShow={isEditable} inputStyle={{ textAlign: 'center', color: 'black' }} />
                    <TextField disabled={!isEditable} defaultValue={profile.companyName} hintText="Company name" underlineShow={isEditable} inputStyle={{ textAlign: 'center', color: 'black' }} />
                    <TextField disabled={!isEditable} defaultValue={profile.phoneNumber} hintText="Phone number" underlineShow={isEditable} inputStyle={{ textAlign: 'center', color: 'black' }} />
                </div>
            </div>
        );
    }
}
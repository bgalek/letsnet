// @flow
import React, { Component } from 'react';
import { Paper, RaisedButton, Avatar, FlatButton, TextField } from "material-ui";
import { PropTypes } from 'prop-types';
import Messages from "../../Messages";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.state = { isEditable: false };
    }

    static propTypes = {
        handleLogout: PropTypes.func.isRequired,
        handleUpdateProfile: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
    };

    handleEditClick() {
        this.setState({ isEditable: true });
    }

    handleSaveClick() {
        this.setState({ isEditable: false });
        this.props.handleUpdateProfile(
            this.refs.textFieldPosition.getValue(),
            this.refs.textFieldCompanyName.getValue(),
            this.refs.textFieldPhoneNumber.getValue()
        );
    }

    render() {
        const { profile } = this.props;
        const isEditable = this.state.isEditable;

        let editButton = null;
        if (isEditable) {
            // assign editable profile view
            editButton = <FlatButton label={Messages.save} style={{ position: 'absolute', right: 0, marginTop: 15 }} onClick={this.handleSaveClick} />;
        } else {
            // assign static profile view
            editButton = <FlatButton label={Messages.edit} style={{ position: 'absolute', right: 0, marginTop: 15 }} onClick={this.handleEditClick} />
        }

        return (
            <div>
                {editButton}
                <div style={{ paddingTop: 51, textAlign: 'center' }}>
                    <Avatar src={profile.photoURL} size={160} /><br />
                    <TextField
                        ref='textFieldName'
                        defaultValue={profile.displayName}
                        underlineShow={false}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 20 }}
                    /><br />
                    <TextField
                        ref='textFieldEmail'
                        defaultValue={profile.email}
                        underlineShow={false}
                        style={{ bottom: 15 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}

                    /><br />
                    <TextField
                        ref='textFieldPosition'
                        disabled={!isEditable}
                        defaultValue={profile.position}
                        hintText={Messages.profileHintPosition}
                        underlineShow={isEditable}
                        style={{ paddingTop: 15 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}
                    /><br />
                    <TextField
                        ref='textFieldCompanyName'
                        disabled={!isEditable}
                        defaultValue={profile.companyName}
                        hintText={Messages.profileHintCompanyName}
                        underlineShow={isEditable}
                        style={{ bottom: 15 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}
                    /><br />
                    <TextField
                        ref='textFieldPhoneNumber'
                        disabled={!isEditable}
                        defaultValue={profile.phoneNumber}
                        hintText={Messages.profileHintPhoneNumber}
                        underlineShow={isEditable}
                        style={{ bottom: 30 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}
                    />
                </div>
            </div>
        );
    }
}
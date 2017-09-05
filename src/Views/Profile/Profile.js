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
        this.props.profile.displayName = this.refs.textFieldName.getValue();
        this.props.profile.email = this.refs.textFieldEmail.getValue();
        this.props.profile.position = this.refs.textFieldPosition.getValue();
        this.props.profile.companyName = this.refs.textFieldCompanyName.getValue();
        this.props.profile.phoneNumber = this.refs.textFieldPhoneNumber.getValue();
    }

    render() {
        const { profile } = this.props;
        const isEditable = this.state.isEditable;

        let editButton = null;
        if (isEditable) {
            // assign editable profile view
            editButton = <FlatButton label='Zapisz' style={{ position: 'absolute', right: 0, marginTop: 15 }} onClick={this.handleSaveClick} />;
        } else {
            // assign static profile view
            editButton = <FlatButton label='Edytuj' style={{ position: 'absolute', right: 0, marginTop: 15 }} onClick={this.handleEditClick} />
        }

        return (
            <div>
                {editButton}
                <div style={{ paddingTop: 51, textAlign: 'center' }}>
                    <Avatar src={profile.photoURL} size={160} /><br />
                    <TextField
                        ref='textFieldName'
                        disabled={!isEditable}
                        defaultValue={profile.displayName}
                        hintText='Imię Nazwisko'
                        underlineShow={isEditable}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 20 }}
                    /><br />
                    <TextField
                        ref='textFieldEmail'
                        disabled={!isEditable}
                        defaultValue={profile.email}
                        hintText='E-mail'
                        underlineShow={isEditable}
                        style={{ bottom: 15 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}

                    /><br />
                    <TextField
                        ref='textFieldPosition'
                        disabled={!isEditable}
                        defaultValue={profile.position}
                        hintText='Stanowisko'
                        underlineShow={isEditable}
                        style={{ paddingTop: 15 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}
                    /><br />
                    <TextField
                        ref='textFieldCompanyName'
                        disabled={!isEditable}
                        defaultValue={profile.companyName}
                        hintText='Nazwa firmy'
                        underlineShow={isEditable}
                        style={{ bottom: 15 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}
                    /><br />
                    <TextField
                        ref='textFieldPhoneNumber'
                        disabled={!isEditable}
                        defaultValue={profile.phoneNumber}
                        hintText='Numer telefonu'
                        underlineShow={isEditable}
                        style={{ bottom: 30 }}
                        inputStyle={{ textAlign: 'center', color: 'black', fontSize: 15 }}
                    />
                </div>
            </div>
        );
    }
}
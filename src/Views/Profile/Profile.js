// @flow
import React, {Component} from 'react';
import {Avatar, FlatButton, TextField} from "material-ui";
import {PropTypes} from 'prop-types';
import Messages from "../../Messages";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            position: props.profile.position,
            companyName: props.profile.companyName,
            phoneNumber: props.profile.phoneNumber
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static propTypes = {
        handleLogout: PropTypes.func.isRequired,
        handleUpdateProfile: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleEditClick() {
        this.setState({isEditable: true});
    }

    handleSaveClick() {
        this.setState({isEditable: false});
        this.props.handleUpdateProfile(
            this.state.position,
            this.state.companyName,
            this.state.phoneNumber
        );
    }

    render() {
        const {profile} = this.props;
        const firstName = (profile.firstName) ? profile.firstName : '';
        const lastName = (profile.firstName) ? profile.lastName : '';
        const isEditable = this.state.isEditable;
        return (
            <div>
                <FlatButton name='editButton'
                            label={isEditable ? Messages.save : Messages.edit}
                            style={{position: 'absolute', right: 0, marginTop: 15}}
                            onClick={isEditable ? this.handleSaveClick : this.handleEditClick}
                />
                <div style={{paddingTop: 51, textAlign: 'center'}}>
                    <Avatar size={160}>{firstName.charAt(0)+lastName.charAt(0)}</Avatar>
                    <TextField
                        name='name'
                        value={profile.firstName + ' ' + profile.lastName}
                        underlineShow={false}
                        style={{display: 'block', margin: 'auto'}}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 20}}
                    />
                    <TextField
                        name='email'
                        value={profile.email}
                        underlineShow={false}
                        style={{display: 'block', margin: 'auto', bottom: 15}}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 15}}
                    />
                    <TextField
                        name='position'
                        disabled={!isEditable}
                        value={this.state.position}
                        hintText={Messages.position}
                        underlineShow={isEditable}
                        style={{display: 'block', margin: 'auto', paddingTop: 15}}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 15}}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='companyName'
                        disabled={!isEditable}
                        value={this.state.companyName}
                        hintText={Messages.companyName}
                        underlineShow={isEditable}
                        style={{display: 'block', margin: 'auto', bottom: 15}}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 15}}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='phoneNumber'
                        disabled={!isEditable}
                        value={this.state.phoneNumber}
                        hintText={Messages.phoneNumber}
                        underlineShow={isEditable}
                        style={{display: 'block', margin: 'auto', bottom: 30}}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 15}}
                        onChange={this.handleInputChange}
                    />
                    <FlatButton label={Messages.logout} onClick={this.props.handleLogout}/>
                </div>
            </div>
        );
    }
}
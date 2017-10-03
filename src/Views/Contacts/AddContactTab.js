// @flow
import React, {Component} from 'react';
import {TextField, SelectField, MenuItem, FlatButton, Avatar} from 'material-ui';
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';

const items = ['Software Developer', 'Designer', 'Consulting', 'Analytics', 'Elo', 'Super', 'HR', 'PR'];
const menuItems = [];

for (let i = 0; i < items.length; i++ ) {
    menuItems.push(<MenuItem value={items[i]} key={i} primaryText={items[i]} />);
}

export default class AddContactTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            position: '',
            companyName: '',
            phoneNumber: '',
            initials: ''
        };

        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    static propTypes = {
        handleAddContact: PropTypes.func.isRequired,
        areas: PropTypes.array.isRequired
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === 'name') {
            this.setState({
                initials: value.split(' ').map((n)=>n[0]).join('')
            });
        }

        this.setState({
            [name]: value
        });
    }

    handleSelection(event, index, value) {
        this.setState({position: value});
    };

    handleAddClick() {
        let newContact = {
            name: this.state.name,
            email: this.state.email,
            position: this.state.position,
            companyName: this.state.companyName,
            phoneNumber: this.state.phoneNumber
        };

        this.props.handleAddContact(newContact);

        this.setState({
            name: '',
            email: '',
            position: '',
            companyName: '',
            phoneNumber: ''
        });
    }

    render() {
        const menuItems = [];
        for (let i = 0; i < this.props.areas.length; i++ ) {
            menuItems.push(<MenuItem value={this.props.areas[i]} key={i} primaryText={this.props.areas[i]} />);
        }

        return (
            <div>
                <FlatButton
                    name='addButton'
                    label={Messages.add}
                    style={{position: 'absolute', right: 0, marginTop: 15}}
                    onClick={this.handleAddClick}
                />

                <div style={{paddingTop: 51, textAlign: 'center'}}>
                    <Avatar size={160}>{this.state.initials}</Avatar>
                    <TextField
                        name='name'
                        value={this.state.name}
                        style={{display: 'block', margin: 'auto', fontSize: 15}}
                        hintText={Messages.name}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='email'
                        value={this.state.email}
                        style={{display: 'block', margin: 'auto', fontSize: 15}}
                        hintText={Messages.email}
                        onChange={this.handleInputChange}
                    />
                    <SelectField
                        value={this.state.position}
                        style={{display: 'block', margin: 'auto', fontSize: 15, textAlign: 'left'}}
                        hintText={Messages.position}
                        onChange={this.handleSelection}
                        maxHeight={180}
                    >
                        {menuItems}
                    </SelectField>
                    <TextField
                        name='companyName'
                        value={this.state.companyName}
                        style={{display: 'block', margin: 'auto', fontSize: 15}}
                        hintText={Messages.companyName}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='phoneNumber'
                        value={this.state.phoneNumber}
                        style={{display: 'block', margin: 'auto', fontSize: 15}}
                        hintText={Messages.phoneNumber}
                        onChange={this.handleInputChange}
                    />
                </div>
            </div>
        );
    }
}
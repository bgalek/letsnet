// @flow
import React, {Component} from 'react';
import {TextField, FlatButton} from 'material-ui';
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';

export default class AddContactTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            position: ''
        };
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static propTypes = {
        handleAddContact: PropTypes.func.isRequired,
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleAddClick() {
        this.setState({
            name: '',
            position: ''
        });

        this.props.handleAddContact(
            this.state.name,
            this.state.position
        );
    }

    render() {
        return (
            <div>
                <FlatButton
                    name='addButton'
                    label={Messages.add}
                    style={{position: 'absolute', right: 0, marginTop: 15}}
                    onClick={this.handleAddClick}
                />
                <div style={{paddingTop: 51, textAlign: 'center'}}>
                    <TextField
                        name='name'
                        value={this.state.name}
                        style={{display: 'block', margin: 'auto'}}
                        hintText={Messages.name}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 20}}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='position'
                        value={this.state.position}
                        style={{display: 'block', margin: 'auto', bottom: 15}}
                        hintText={Messages.position}
                        inputStyle={{textAlign: 'center', color: 'black', fontSize: 15}}
                        onChange={this.handleInputChange}
                    />
                </div>
            </div>
        );
    }
}
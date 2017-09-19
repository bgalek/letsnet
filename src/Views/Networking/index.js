// @flow
import React, {Component} from 'react';
import {Tab, Tabs} from "material-ui";
import Messages from '../../Messages';
import BrowseTab from './BrowseTab';
import ScanTab from "./ScanTab";
import InvitationsTab from "./InvitationsTab";

export default class Networking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCamera: false
        };
    }

    handleChange(value) {
        if (value === 'scan') this.setState({showCamera: true});
        else this.setState({showCamera: false});
    };

    render() {
        return (
            <div>
                <Tabs value={this.state.selectedIndex} onChange={(val) => this.handleChange(val)}>
                    <Tab label={Messages.browse} value="browse">
                        <BrowseTab/>
                    </Tab>
                    <Tab label={Messages.scan} value="scan">
                        <ScanTab scanning={false}/>
                    </Tab>
                    <Tab label={Messages.invitations} value="invitations">
                        <InvitationsTab/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
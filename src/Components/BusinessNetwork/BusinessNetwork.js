import React, {Component} from 'react';
import {Tab, Tabs} from "material-ui";
import Scanner from "../Scanner/Scanner";
import AddCard from "../AddCard/AddCard";

class BusinessNetwork extends Component {
    render() {
        return (
            <Tabs>
                <Tab label="Scan">
                    <Scanner onScaned={console.log}/>
                </Tab>
                <Tab label="Add manually">
                    <AddCard/>
                </Tab>
            </Tabs>
        );
    }
}

export default BusinessNetwork;
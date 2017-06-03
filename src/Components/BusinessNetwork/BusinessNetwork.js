import React, {Component} from 'react';
import './BusinessNetwork.css';
import {Tab, Tabs} from "material-ui";
import Scanner from "../Scanner/Scanner";
import AddCard from "../EditProfile/EditProfile";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};


class BusinessNetwork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };


    render() {
        return (
            <Tabs value={this.state.value} onChange={this.handleChange}>
                <Tab label="Scan" value="a">
                    <Scanner onScaned={console.log}/>
                </Tab>
                <Tab label="Add manually" value="b">
                    <AddCard/>
                </Tab>
            </Tabs>
        );
    }
}

export default BusinessNetwork;
// @flow
import React, {Component} from 'react';
import PeopleBrowser from "./PeopleBrowser";

export default class BrowseTab extends Component {
    render() {
        return (
            <PeopleBrowser people={[
                {id:1, name: 'Bartosz Gałek', position: 'software developer', area: 'Programowanie'},
                {id:2, name: 'Martyna Gałek', position: 'dentist', area: 'Badanie i Rozwój'},
                {id:3, name: 'Kacper Gałek', position: 'student', area: 'Analityka'},
                {id:4, name: 'Julita Gałek', position: 'student', area: 'Analityka'},
            ]}/>
        );
    }
}
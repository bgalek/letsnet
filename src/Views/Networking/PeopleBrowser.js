// @flow
import React, {Component} from 'react';
import {FlatButton, List, ListItem} from "material-ui";
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import PropTypes from 'prop-types';
import Messages from '../../Messages';
import PersonListItem from "../../Components/PersonListItem/PersonListItem";
import PersonDetails from "./PersonDetails";

export default class PeopleBrowser extends Component {

    static propTypes = {
        people: PropTypes.array.isRequired,
        checkIfInvited: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            selectedArea: null,
            selectedPerson: null
        }
    }

    render() {
        if (this.state.selectedPerson) {
            return this.renderPerson(this.state.selectedPerson);
        }
        if (this.state.selectedArea) {
            return this.renderArea(this.state.selectedArea);
        }
        return this.renderBrowser();
    }

    renderPerson(person) {
        return (
            <div>
                <FlatButton style={{margin: 10}}
                            label={Messages.back}
                            icon={<NavigationArrowBack/>}
                            onTouchTap={() => this.setState({selectedPerson: null})}/>
                <PersonDetails person={person} checkIfInvited={this.props.checkIfInvited}/>
            </div>
        );
    }

    handlePersonClick(person) {
        this.setState({selectedPerson: person});
    }

    renderArea(selectedArea) {
        const people = this.props.people.filter(person => person.area === selectedArea).map(person =>
            <PersonListItem key={person.id} person={person} onTouchTap={() => this.handlePersonClick(person)}/>);
        return (
            <div>
                <FlatButton style={{margin: 10}}
                            label={Messages.back}
                            icon={<NavigationArrowBack/>}
                            onTouchTap={() => this.setState({selectedArea: null})}/>
                <List>{people}</List>
            </div>
        );
    }

    handleAreaClick(areaName) {
        this.setState({selectedArea: areaName});
    }

    renderBrowser(areasWithCounters) {
        const counts = this.props.people.reduce((prev, next) => {
            const area = next.area;
            if (!prev.hasOwnProperty(area)) prev[area] = 0;
            prev[area]++;
            return prev;
        }, {});
        areasWithCounters = Object.keys(counts)
            .map(areaName => ({name: areaName, count: counts[areaName]}))
            .map(area => <ListItem
                key={area.name}
                primaryText={`${area.name} (${area.count})`}
                onTouchTap={(e) => this.handleAreaClick(area.name)}
            />);
        return (<List>{areasWithCounters}</List>);
    }
}
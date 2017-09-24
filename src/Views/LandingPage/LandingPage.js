import * as React from "react";
import {Paper} from "material-ui";
import {PropTypes} from 'prop-types';

export default class LandingPage extends React.Component {

    static propTypes = {
        conferences: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Paper zDepth={1} style={{padding: 50, textAlign: 'center'}}>
                <h1>Witaj w Let's Net!</h1>
                <p>Wybierz interesującą Cię konferencję</p>
                <p>--</p>
                {this.props.conferences.map(conf => <li
                    style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}} key={conf.title}>
                    <a onClick={() => this.props.history.push(`/conference/${conf.id}/home`)}>
                        <img alt={conf.title} style={{maxWidth: '90%'}} src={conf.leadPhoto}/>
                    </a>
                </li>)}
            </Paper>
        );
    }
}
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
                <h1>O co w tym chodzi?</h1>
                <p>Nasza platforma to uniwersalna aplikacja webowa, która pomoże Ci łatwo nawiązywać kontakty podczas
                    konferencji.</p>
                <ul>
                    <li style={{textAlign: 'left'}}>Trzymaj wszystkie informacje o nadchodządzych wydarzaniach w jednym
                        miejscu.
                    </li>
                    <li style={{textAlign: 'left'}}>Zdobywaj nowe znajomości</li>
                    <li style={{textAlign: 'left'}}>Zarządzaj kontaktami i utrzymuj relacje biznesowe</li>
                </ul>
                <p>
                    <strong>A wszystko to bez potrzeby ściągania kolejnej aplikacji na telefon.</strong>
                </p>

                <p>Wybierz interesującą Cię konferencję i zacznij nawiązywać kontakty:</p>
                <ul>
                    {this.props.conferences.map(conf => <li
                        style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}} key={conf.id}>
                        <img onClick={() => this.props.history.push(`/conference/${conf.id}/home`)} alt={conf.title}
                             style={{maxWidth: '90%'}} src={conf.leadPhoto}/>
                    </li>)}
                </ul>
                <small>Jeśli chcesz <strong>Let's net</strong> na swoim wydarzeniu napisz na hello@letsnet.pl</small>
            </Paper>
        );
    }
}
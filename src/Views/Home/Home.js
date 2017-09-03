import * as React from "react";
import {Paper} from "material-ui";

export default class Home extends React.Component {

    render() {
        return (
            <Paper style={{padding: 30, margin: 30, textAlign: 'center', display: 'flex', flexDirection: 'column'}} zDepth={1}>
                <p>Ekran główny!</p>
            </Paper>
        )
    }
}
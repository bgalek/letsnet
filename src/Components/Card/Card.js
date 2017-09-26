import * as React from "react";
import {Paper} from "material-ui";

export default class Card extends React.Component {

    render() {
        const defaults = {padding: 30, margin: 30, display: 'flex', flexDirection: 'column'};
        const styles = Object.assign({}, defaults, this.props.style);
        return (
            <Paper style={styles} zDepth={1}>
                {this.props.children}
            </Paper>
        )
    }
}
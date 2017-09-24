import * as React from "react";
import Card from "../../Components/Card/Card";

export default class Stream extends React.Component {

    render() {
        console.log(this.props.conference);
        return (
            <Card>
                <p>Streams!</p>
            </Card>
        )
    }
}
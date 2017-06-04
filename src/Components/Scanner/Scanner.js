import React, {Component} from 'react';
import QrReader from 'react-qr-reader'
import {Col, Row, Grid} from "react-flexbox-grid";

class Scanner extends Component {

    handleScan(data) {
        if (data) this.props.onScaned(JSON.parse(data));
    }

    handleError(err) {
        console.error(err);
        throw err;
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <p>Scan business card here:</p>
                        <QrReader
                            delay={200}
                            style={{width: '100%'}}
                            onError={() => this.handleError}
                            onScan={(data) => this.handleScan(data)}
                            facingMode={'rear'}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Scanner;
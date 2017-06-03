import React, {Component} from 'react';
import QrReader from 'react-qr-reader'
import './Scanner.css';

class Scanner extends Component {

    handleScan(data) {
        this.props.onScaned(JSON.parse(data));
    }

    handleError(err) {
        console.error(err);
        throw err;
    }

    render() {
        return (
            <div className="Reader-container">
                <p>Scan business card here:</p>
                <QrReader
                    delay={200}
                    style={{width: '100%'}}
                    onError={() => this.handleError}
                    onScan={(data) => this.handleScan(data)}
                    facingMode={'rear'}
                />
            </div>
        )
    }
}

export default Scanner;
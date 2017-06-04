import React, {Component} from 'react';
import './AddCard.css';
import {Avatar, FlatButton, TextField} from "material-ui";
import {Col, Row, Grid} from "react-flexbox-grid";
import DoneIcon from 'material-ui/svg-icons/action/done';
import ClearIcon from 'material-ui/svg-icons/content/clear';

const style = {
    margin: 5,
};

class AddCard extends Component {

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} style={{textAlign: 'center', marginTop: 25, marginBottom: 25}}>
                        <Avatar size={80} style={{margin: 10}}/>
                        <TextField placeholder="Name Surname" style={style}/>
                        <TextField placeholder="Occupation" style={style}/>
                        <TextField placeholder="Company name" style={style}/>
                        <TextField placeholder="E-mail" style={style}/>
                        <TextField placeholder="Phone number" style={style}/>
                        <hr />
                        <FlatButton label="Save" icon={<DoneIcon />}/>
                        <FlatButton label="Clear" icon={<ClearIcon />}/>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default AddCard;
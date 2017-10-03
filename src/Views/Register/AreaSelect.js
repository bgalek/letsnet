import * as React from "react";
import {PropTypes} from 'prop-types';
import {MenuItem, SelectField} from "material-ui";
import Messages from '../../Messages';

export default class AreaSelect extends React.Component {

    static propTypes = {
        areas: PropTypes.object.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    static state = {
        selectedArea: "NONE"
    };

    render() {
        const options = Object.keys(this.props.areas).map(key => <MenuItem key={key} value={this.props.areas[key]}
                                                                           primaryText={this.props.areas[key]}/>);
        return (
            <SelectField floatingLabelText={Messages.area}
                         value={this.props.value}
                         onChange={this.props.onChange}
                         fullWidth={true}>
                {options}
            </SelectField>
        );
    }
}
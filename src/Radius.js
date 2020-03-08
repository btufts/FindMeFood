import React, { Component } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import './DropDown.css';

class Radius extends Component {
    constructor (props) {
        super(props);
        this.state = {
            radiusTitle: "Radius Filter",
        }
    }

    handleChange = (selection) => {
        this.setState ({
            radiusTitle: selection,
        })
        this.props.onChange(selection);
    }

    render () {

        return (
            <DropdownButton id = 'radDropStyle' onSelect = {(eventKey) => this.handleChange(eventKey)} title={this.state.radiusTitle}>
                <Dropdown.Item eventKey = "Any">Any</Dropdown.Item>
                <Dropdown.Item eventKey = "2">2</Dropdown.Item>
                <Dropdown.Item eventKey = "5">5</Dropdown.Item>
                <Dropdown.Item eventKey = "10">10</Dropdown.Item>
                <Dropdown.Item eventKey = "15">15</Dropdown.Item>
                <Dropdown.Item eventKey = "20">20</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default Radius;
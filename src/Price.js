import React, { Component } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import './DropDown.css';

class Price extends Component {
    constructor (props) {
        super(props);
        this.state = {
            priceTitle: "Price Filter",
        }
    }

    handleChange = (selection) => {
        this.setState ({
            priceTitle: selection,
        })
        this.props.onChange(selection);
    }

    render () {

        return (
            <DropdownButton id = "priceDropStyle" onSelect = {(eventKey) => this.handleChange(eventKey)} title={this.state.priceTitle}>
                <Dropdown.Item eventKey = "Any">Any</Dropdown.Item>
                <Dropdown.Item eventKey = "$">$</Dropdown.Item>
                <Dropdown.Item eventKey = "$$">$$</Dropdown.Item>
                <Dropdown.Item eventKey = "$$$">$$$</Dropdown.Item>
                <Dropdown.Item eventKey = "$$$$">$$$$</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default Price;
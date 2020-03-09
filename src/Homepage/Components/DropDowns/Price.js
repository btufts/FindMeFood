import React, { Component } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import './DropDown.css';

/**
 * Handles changes to the price filter
 */
class Price extends Component {
    /**
     * Constructs initial state for price filter
     * @param {} props 
     */
    constructor (props) {
        super(props);
        this.state = {
            priceTitle: "Price Filter",
        }
    }

    /**
     * Changes priceTitle to whatever item was selected
     */
    handleChange = (selection) => {
        this.setState ({
            priceTitle: selection,
        })
        this.props.onChange(selection);
    }

    /**
     * Creates the dropdown button and all of the items
     */
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
import React, { Component } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import './DropDown.css'

/**
 * Handles changes of the category filter
 */
class Categories extends Component {
    /**
     * Constructs initial state of category filter
     * @param {*} props 
     */
    constructor (props) {
        super(props);
        this.state = {
            catTitle: "Category Filter",
        }
    }

    /**
     * Changes catTitle to whatever item was selected
     */
    handleChange = (selection) => {
        this.setState ({
            catTitle: selection,
        })
        this.props.onChange(selection);
    }

    /**
     * Creates the dropdown button and all the items
     */
    render () {

        return (
            <DropdownButton id = 'catDropStyle' onSelect = {(eventKey) => this.handleChange(eventKey)} title={this.state.catTitle}>
                <Dropdown.Item eventKey = "Any">Any</Dropdown.Item>
                <Dropdown.Item eventKey = "Asian Fusion">Asian Fusion</Dropdown.Item>
                <Dropdown.Item eventKey = "Bistro">Bistro</Dropdown.Item>
                <Dropdown.Item eventKey = "Buffet">Buffet</Dropdown.Item>
                <Dropdown.Item eventKey = "Chinese">Chinese</Dropdown.Item>
                <Dropdown.Item eventKey = "Diners">Diners</Dropdown.Item>
                <Dropdown.Item eventKey = "Indian">Indian</Dropdown.Item>
                <Dropdown.Item eventKey = "Italian">Italian</Dropdown.Item>
                <Dropdown.Item eventKey = "Mexican">Mexican</Dropdown.Item>
                <Dropdown.Item eventKey = "Pizza">Pizza</Dropdown.Item>
                <Dropdown.Item eventKey = "Pub Food">Pub Food</Dropdown.Item>
                <Dropdown.Item eventKey = "SeaFood">SeaFood</Dropdown.Item>
                <Dropdown.Item eventKey = "Steakhouses">Steakhouses</Dropdown.Item>
                <Dropdown.Item eventKey = "Thai">Thai</Dropdown.Item>
                <Dropdown.Item eventKey = "Vegan">Vegan</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default Categories;
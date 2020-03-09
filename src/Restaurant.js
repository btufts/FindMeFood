import React, { Component } from 'react';
import './Restaurant.css';

/**
 * Handles the parsing and displaying of resturaunt info
 */
class Restaurant extends Component {
    /**
     * Constructs intial information of resturaunt which all starts blank
     * @param {} props 
     */
    constructor (props) {
        super(props);
        this.state = {
            businessName: '',
            businessPrice: '',
            businessAddress: '',
            businessRating: '',
            businessPhone: '',
            yelpBusinessURL: '',
            previous: [],
        }
    }

    /**
     * Finds random number to be used in selected resturaunt from array
     */
    rando () {
        const min = 0;
        const max = this.props.info.length;
        let rand = Math.floor(min + Math.random() * (max - min));
        while(this.state.previous.includes(rand)){
            rand = Math.floor(min + Math.random() * (max - min));
        }
        return rand;
    }

    /**
     * Runs everytime this component updates
     * @param {the previous array of resturaunts} prevProps 
     */
    componentDidUpdate (prevProps) {
        let rand = this.rando();
        // Checks if new array of resturaunts is different then previous and if it is resets the previous array to empty
        if(prevProps.info !== this.props.info && this.props.info.length !== 0){
            this.setState ({
                previous: this.state.previous.splice(0, this.state.previous.length),
            });
            this.pickRest(rand);
        } 
    }

    /**
     * Uses random number and parses information from the business at the number in the array
     */
    pickRest = (selection) => {
        // Gets coordinates of resturaunt
        this.props.onChange(this.props.info[selection]["coordinates"]["latitude"], this.props.info[selection]["coordinates"]["longitude"])
        // Sets the state of resturaunt info to the info of the resturaunt selected
        this.setState ({
            businessName: this.props.info[selection]["name"],
            businessPrice: this.props.info[selection]["price"],
            businessAddress: this.props.info[selection]["location"]["display_address"],
            businessRating: this.props.info[selection]["rating"],
            businessPhone: this.props.info[selection]["phone"],
            yelpBusinessURL: this.props.info[selection]["url"],
            previous: this.state.previous.concat(selection),
        })
    }

    /**
     * Picks a new random resturaunt from array 
     */ 
    goNext () {
        // Checks if there is any business in array that isn't in the previous array
        if(this.props.info.length > this.state.previous.length + 1){
            let rand = this.rando();
            this.pickRest(rand);
        }
    }

    /**
     * Goes back to the previous resturaunt
     */
    goPrevious () {
        if(this.state.previous.length > 1){
            let num = this.state.previous.length - 1;
            let newPre = this.state.previous;
            // Removes the item from previous array when you go back to it
            newPre.splice(num,1);
            // Resets info and coordinates to the info and coordinates of the previous resturaunt
            this.props.onChange(this.props.info[this.state.previous[num - 1]]["coordinates"]["latitude"], this.props.info[this.state.previous[num - 1]]["coordinates"]["longitude"])
            this.setState ({
                businessName: this.props.info[this.state.previous[num - 1]]["name"],
                businessPrice: this.props.info[this.state.previous[num - 1]]["price"],
                businessAddress: this.props.info[this.state.previous[num - 1]]["location"]["display_address"],
                businessRating: this.props.info[this.state.previous[num - 1]]["rating"],
                businessPhone: this.props.info[this.state.previous[num - 1]]["phone"],
                yelpBusinessURL: this.props.info[this.state.previous[num  -1]]["url"],
                previous: newPre,
            })
        }
    }

    /**
     * Creates all of the info for the resturaunt
     */
    render () {   
        let isRest = true;

        // Checks if a business is located
        if(this.state.businessName === ''){
            isRest = false;
        }
        // The triple conditional checks first that you have a location, then if a search has been attempted, then if the business array has anything
        // Also creates next and previous buttons
        return (
            <div className = "Restaurant"> { this.props.locCheck ? ( this.props.searched ? ( isRest ? (
                <div className = "infoStyle"> 
                        <a href = {this.state.yelpBusinessURL} target="_blank" rel = 'noopener noreferrer' className = "titleRest">{this.state.businessName}</a>
                        <p className = "priceRest">{this.state.businessPrice}</p>
                        <p id = "rateRest">{this.state.businessRating} stars</p>
                        <p className = "addRest">{this.state.businessAddress[0]}</p>
                        <p className = "addRest">{this.state.businessAddress[1]}</p>
                        <p className = "phoneRest">Phone: {this.state.businessPhone}</p>
                    </div>
                ) : (
                    <h3>No restaurant could be found.</h3>
                )) : (
                    <p></p>
                )) : (
                <div>
                    <h3>Your location could not be found, make sure you are connecting via https.</h3>
                </div>
            )}
                
                <div className = "nextStyle">  
                    <button onClick = {() => this.goNext()}>Next</button>
                </div>
                <div className = "prevStyle">
                    <button onClick = {() => this.goPrevious()}>Previous</button>
                </div>
            </div>
        );
    }
}

export default Restaurant;
import React, { Component } from 'react';
import './Restaurant.css';

class Restaurant extends Component {
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

    rando () {
        let rand = 0;
        while(this.state.previous.includes(rand)){
            const min = 0;
            const max = this.props.info.length;
            rand = Math.floor(min + Math.random() * (max - min));
        }
        return rand;
    }

    componentDidUpdate (prevProps) {
        let rand = this.rando();
        if(prevProps.info !== this.props.info && this.props.info.length !== 0){
            this.setState ({
                previous: this.state.previous.splice(0, this.state.previous.length),
            });
            this.pickRest(rand);
        }
        
    }

    pickRest = (selection) => {
        this.props.onChange(this.props.info[selection]["coordinates"]["latitude"], this.props.info[selection]["coordinates"]["longitude"])
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

    goNext () {
        if(this.props.info.length > this.state.previous.length + 1){
            let rand = this.rando();
            this.pickRest(rand);
        }
    }

    goPrevious () {
        if(this.state.previous.length > 1){
            let num = this.state.previous.length - 1;
            let newPre = this.state.previous;
            newPre.splice(num,1);
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

    render () {   
        let isRest = false;
        if(this.state.businessName !== ''){
            isRest = true;
        }
        console.log(this.state.previous);
        return (
            <div className = "Restaurant"> { isRest ? (
                <div className = "infoStyle"> 
                    <p className = "titleRest">{this.state.businessName}</p>
                    <p className = "priceRest">{this.state.businessPrice}</p>
                    <p id = "rateRest">{this.state.businessRating} stars</p>
                    <p className = "addRest">{this.state.businessAddress[0]}</p>
                    <p className = "addRest">{this.state.businessAddress[1]}</p>
                    <p className = "phoneRest">Phone: {this.state.businessPhone}</p>
                </div>
            ) : (
                <div>
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
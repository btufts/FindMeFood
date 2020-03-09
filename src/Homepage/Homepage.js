import React, { Component } from 'react';
import Price from "./Components/DropDowns/Price";
import axios from 'axios';
import Restaurant from './Components/Restaurant';
import Radius from './Components/DropDowns/Radius';
import './Homepage.css';
import MapBox from './Components/MapBox';
import Categories from './Components/DropDowns/Categories';
import './Components/Restaurant.css';

/**
 * Class handles the ordering of everything on the homepage and the get requests
 */
class Homepage extends Component {
    
    /**
     * Constructor that sets the initial states for all of the compenents of the web app
     * @param {} props 
     */
    constructor (props) {
        super(props);
        this.state = {
            price: "0",
            latitude: "-37.0680",
            longitude: "-12.3113",
            selection: [],
            radius: "40000",
            businessLat: "",
            businessLng: "",
            category: "",
            searched: false, // searched is initially set to false because a search attempt has not been made yet
        }
    }

    /**
     * Converts value e which is a string to an int to be used in get request
     */
    onChangePrice = (e) => {
        let priceInt = "0";

        if(e === "$"){
            priceInt = "1";
        } else if(e === "$$") {
            priceInt = "2";
        } else if (e === "$$$"){
            priceInt = "3";
        } else if (e === "$$$$"){
            priceInt = "4";
        }
        // Updates state of priceInt
        this.setState({
            price: priceInt,
        });
    }

    /**
     * Converts value r which is an int in miles to meters to be used in get request
     */
    onChangeRadius = (r) => {
        let radiusInt = "40000"

        if(r === "2"){
            radiusInt = "3220"
        } else if(r === "5"){
            radiusInt = "8050"
        } else if(r === "10"){
            radiusInt = "1695"
        } else if(r === "15"){
            radiusInt = "24140"
        } else if(r === "20"){
            radiusInt = "32180"
        }
        // Updates state of radiusInt
        this.setState({
            radius: radiusInt,
        });
    }

    /**
     * Conversts value c to a string that can be used in get request
     */
    onChangeCategory = (c) => {
        let category = c;
        if(c === "Asian Fusion"){
            category = "asianfusion"
        } else if (c === "Bistro"){
            category = "bistros"
        } else if (c === "Buffet"){
            category = "buffets"
        } else if (c === "Chinese"){
            category = "chinese"
        } else if (c === "Diners"){
            category = "diners"
        } else if (c === "Indian"){
            category = "indpak"
        } else if (c === "Italian"){
            category = "italian"
        } else if (c === "Mexican"){
            category = "mexican"
        } else if (c === "Pizza"){
            category = "pizza"
        } else if (c === "Pub Food") {
            category = "pubfood"
        } else if (c === "SeaFood") {
            category = "seafood"
        } else if (c === "Steakhouses") {
            category = "steak"
        } else if (c === "Thai") {
            category = "thai"
        } else if (c === "Vegan") {
            category = "vegan"
        }
        // Updates state of category
        this.setState ({
            category: category,
        });
    }

    /**
     * Checks if the users location can be accessed
     */
    testLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } 
    }

    /**
     * Sets location to the users latitude and longitude
     */
    setLocation = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    /**
     * Sets the state of the businesses latitude and longitude
     */
    setBusinessLocation = (latitude, longitude) => {
        this.setState({
            businessLat: latitude,
            businessLng: longitude,
        })
    }

    /**
     * Creates get request to be sent to yelp
     */
    searchRest = () => {
        // base request
        let link = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&open_now=true' + '&limit=50';

        // Adds a price if price was selected
        if(this.state.price !== '0'){
            link += '&price=' + this.state.price;
        }

        // Adds a radiues if radius was selected
        if(this.state.radius !== '40000'){
            link += '&radius=' + this.state.radius;
        }

        // Adds a category if category was selected
        if(this.state.category !== ''){
            link += '&categories=' + this.state.category;
        }

        // Sends get request
        axios.get(link, {
            headers: {
                'Authorization': `Bearer nW2vtGMV9ihJd3dh6w1pHJBBSO09nkl2RWmwEcxGfUNEkCEz4b9kiBHqyZfj9GZnKuqcPPWSKM6attAbcG3ZhC0wmmUeL7iBei2EyxvGqU_OfIzLMgPpPaKPd3VUXnYx`,
            }
        }).then(data => { // Stores Return
            // Sets state of slection to the array of businesses that was returned from yelp
            this.setState ({
                selection: data["data"]["businesses"],
            })
        })
        // Sets state of searched to true so the application knows a search attempt was made
        this.setState ({
            searched: true,
        });
    }

    // When the application starts an attempt to get location is made
    componentDidMount() {
        this.testLocation();
    }


    render () {
        let locCheck = true;

        // Checks if location has been changed from base location
        if(this.state.longitude === "-12.3113" && this.state.latitude === "-37.0680"){
            locCheck = false;
        }
        // Returns combination of all segments on homepage
        return (
            <div className = "homePage">
                <div className = "filters">
                    <h2>Filters:</h2>
                    <div className = "priceDropFilter">
                        <Price className = "priceDropFilter" onChange = {this.onChangePrice}/>
                    </div>
                    <div className = "radDropFilter">
                        <Radius className = "radDropFilter" onChange = {this.onChangeRadius}/>
                    </div>
                    <div className = "catDropFilter">
                        <Categories className = "catDropFilter" onChange = {this.onChangeCategory}/>
                    </div>
                    <button className = "searchButton" onClick = {this.searchRest}>Search</button>
                </div>
                
                <div className = "card">
                    <div className = "mapFormat">
                        <MapBox lat = {this.state.latitude} lng = {this.state.longitude} businessLat = {this.state.businessLat} businessLng = {this.state.businessLng} />
                    </div>
                    <div className = "controls"> 
                        <Restaurant info = {this.state.selection} onChange = {this.setBusinessLocation} locCheck = {locCheck} searched = {this.state.searched}/>
                    </div>
                </div>
                <div>
                    <p>These days we are bombarded by far too many restaurant options, making the decision on where to eat more complicated than it needs to be. 
                        This program enables the user to just put in specifcations of what they want and be given a random place to go to that meets their criteria, 
                        simplifying the entire process. If they don't like that place, they can click next to be given a new random restaurant that also meets their 
                        criteria.</p>
                </div>
            </div>
        );
    }

}

export default Homepage;
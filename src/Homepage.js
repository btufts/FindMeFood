import React, { Component } from 'react';
import Price from "./Price";
import axios from 'axios';
import Restaurant from './Restaurant';
import Radius from './Radius';
import './Homepage.css';
import MapBox from './MapBox';
import Categories from './Categories';
import './Restaurant.css';

class Homepage extends Component {
    
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
            searched: false,
        }
    }

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

        this.setState({
            price: priceInt,
        });
    }

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

        this.setState({
            radius: radiusInt,
        });
    }

    onChangeCategory = (c) => {
        let category = c;
        if(c === "Asian Fusion"){
            category = "asianfusion"
        } else if (c === "Bistro"){
            category = "bistros"
        } else if (c === "Buffet"){
            category = "buffets"
        } else if (c === "Cafe"){
            category = "cafes"
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
        this.setState ({
            category: category,
        });
    }

    testLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            alert("Location can't be found!");
        }
    }

    setLocation = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    setBusinessLocation = (latitude, longitude) => {
        this.setState({
            businessLat: latitude,
            businessLng: longitude,
        })
    }

    searchRest = () => {
        let link = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude + '&open_now=true' +'&limit=50';

        if(this.state.price !== '0'){
            link += '&price=' + this.state.price;
        }

        if(this.state.radius !== '40000'){
            link += '&radius=' + this.state.radius;
        }

        if(this.state.category !== ''){
            link += '&categories=' + this.state.category;
        }

        axios.get(link, {
            headers: {
                'Authorization': `Bearer nW2vtGMV9ihJd3dh6w1pHJBBSO09nkl2RWmwEcxGfUNEkCEz4b9kiBHqyZfj9GZnKuqcPPWSKM6attAbcG3ZhC0wmmUeL7iBei2EyxvGqU_OfIzLMgPpPaKPd3VUXnYx`,
            }
        }).then(data => {
            this.setState ({
                selection: data["data"]["businesses"],
            })
        })
        this.setState ({
            searched: true,
        });
    }

    componentDidMount() {
        this.testLocation();
    }


    render () {
        let locCheck = true;

        if(this.state.longitude === "-12.3113" && this.state.latitude === "-37.0680"){
            locCheck = false;
        }

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
            </div>
        );
    }

}

export default Homepage;
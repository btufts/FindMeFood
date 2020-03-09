import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import '../../App.css';

/**
 * Handles the map component
 */
class MapBox extends Component {

    /**
     * Creates the map
     */
    render () {
        // Checks if there is a resturaunt to pin yet
        let isRest = false;
        if(this.props.businessLat !== "" && this.props.businessLng !== ""){
            isRest = true;
        }
        // Creates initial map with initial center and recenters on each business
        // Conditional statement pins a business if there is a business and if there is not just hides pin behind other location pin
        return ( 
                <Map
                google={this.props.google}
                zoom={14}
                ref="map"
                initialCenter= {{lat: this.props.lat, lng: this.props.lng}}
                center={isRest ? (
                    { lat: this.props.businessLat, lng: this.props.businessLng}
                ) : (
                    {lat: this.props.lat, lng: this.props.lng}
                )}>
                    {isRest ? (
                        <Marker position={{lat: this.props.businessLat, lng: this.props.businessLng}}/>
                    ) : (
                        <Marker icon = {'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} position={{lat: this.props.lat, lng: this.props.lng}}/>
                    )}
                    <Marker icon = {'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} position={{lat: this.props.lat, lng: this.props.lng}}/>     
                </Map>

        );
    }
}

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyBxiqWEIzthOwgV2l6uYNEr5M1S4hdzBl0'
})(MapBox);
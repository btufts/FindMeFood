import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


class MapBox extends Component {

    render () {
        let isRest = false;
        if(this.props.businessLat !== "" && this.props.businessLng !== ""){
            isRest = true;
        }
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
                        <Marker position={{lat: this.props.lat, lng: this.props.lng}}/>
                    )}
                    <Marker position={{lat: this.props.lat, lng: this.props.lng}}/>     
                </Map>

        );
    }
}

export default GoogleApiWrapper ({
    apiKey: 'AIzaSyBxiqWEIzthOwgV2l6uYNEr5M1S4hdzBl0'
})(MapBox);
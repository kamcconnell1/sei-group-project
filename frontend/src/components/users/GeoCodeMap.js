import 'mapbox-gl/dist/mapbox-gl.css'
import "mapbox-gl/dist/mapbox-gl.css"
import React from 'react'

import MapGl, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
import DeckGL, { GeoJsonLayer} from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'


class Map extends React.Component {
  state = {
    viewport: {
      latitude: 51.515,
      longitude: -0.078,
      zoom: 12
    },
    searchResultLayer: null, 

        latitude: '', 
        longitude: ''
      
    }
  

  myMap = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  
  handleOnResult = event => {
    console.log(event.result);
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }

  handleDropPin = event => {
    const latitude = (this.state.viewport.latitude)
    const longitude = (this.state.viewport.longitude)
    this.setState({latitude, longitude})
    
  }

  render() {
console.log(this.state);

    const { viewport, searchResultLayer } = this.state

    return (
      <>
      <MapGl
      ref={this.myMap}
        {...viewport}
        height={'800px'}
        width={'60vw'}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/mapbox/light-v10'
      >
        <Geocoder 
        mapRef={this.myMap}  
        onResult={this.handleOnResult}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        position="top-left"/>
        <GeolocateControl />
        <NavigationControl />
        <Marker 
        className="marker"
        {...viewport} />
        <DeckGL {...viewport} layers={[searchResultLayer]} />
      </MapGl>
      <button 
      className="button is-primary"
      onClick={this.handleDropPin}>Save Location</button>
      </>
    )
  }
}

export default Map
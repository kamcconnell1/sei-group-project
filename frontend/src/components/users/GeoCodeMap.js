import 'mapbox-gl/dist/mapbox-gl.css'
import "mapbox-gl/dist/mapbox-gl.css"
import React from 'react'

import MapGl, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
import DeckGL, { GeoJsonLayer } from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'

import TestGeoJson from '../users/TestGeoJSON'
import TestGeoJSON from '../users/TestGeoJSON'

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

  
  
  jsonData = () => {
    const pins = []
    
    for (let i = 0; i < 3; i++ ){
      const pin = this.props.pins
      const id = i
      const latitude = pin[i].latitude
      const longitude = pin[i].longitude
      
      pins.push({
        type: "Pin",
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        properties: {
          id,
          name: pin[i].title,
          description: pin[i].place
        }
      })
    }
    console.log(this.pins);
  }
  
  //This is required as a paramter for Geocode to work
  myMap = React.createRef()
  
  //This function continuously sets state as you move the viewport
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  
  // This sets state with lots of details from the users search location - probably not necessary
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
  
  
  // Sets state based on the lat / long the viewport has landed on & opens the pin form modal when you add pin. Callback function passes lat / long back up to parent
  handleDropPin = event => {
    const latitude = (this.state.viewport.latitude)
    const longitude = (this.state.viewport.longitude)
    this.props.onClick()
    this.setState({ latitude, longitude }, () => {
      this.props.onChange({ target: { name: this.state.name, value: this.state.value } })
    })
  }
  
  
  
  // pinLayer = new GeoJsonLayer({
    //   id:"pin-layer",
    //   data: <TestGeoJSON />,
    //   pickable: true
    // })
    
    
    
    render() {

      
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
          position="top-left" />
        <GeolocateControl />
        <NavigationControl />
        <Marker
          className="marker"
          {...viewport} />
        <DeckGL {...viewport} layers={[searchResultLayer], [this.pinLayer]} />
      </MapGl>
      <button
        className="button is-primary"
        onClick={this.handleDropPin}
      >Save Location</button>
    </>
  )
}
}

export default Map
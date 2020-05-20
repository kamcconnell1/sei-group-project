import 'mapbox-gl/dist/mapbox-gl.css'
import "mapbox-gl/dist/mapbox-gl.css"
import React from 'react'
import MapGl, { Marker, Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import Pins from '../pins/pins'
import PinCard from '../pins/PinCard'


class Map extends React.Component {
  state = {
    viewport: {
      latitude: 51.515,
      longitude: -0.078,
      zoom: 12
    },
    popupInfo: null,
    // state of dropped pin
    latitude: '',
    longitude: ''
  }

  //* This is required as a paramter for Geocode to work
  myMap = React.createRef()

  //* This function continuously sets state as you move the viewport
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  // * Sets state based on the lat / long the viewport has landed on & opens the pin form modal when you add pin. Callback function passes lat / long back up to parent
  handleDropPin = event => {
    const latitude = (this.state.viewport.latitude)
    const longitude = (this.state.viewport.longitude)
    this.props.onClick()
    this.setState({ latitude, longitude }, () => {
      this.props.location(this.state.latitude, this.state.longitude)
    })
  }

  //* Sets state based on which marker you click on
onClickMarker = (pin) => {
  this.setState({popupInfo: pin})
}

//* Popup details
renderPopup(props) {
  const {popupInfo} = this.state
  
  return (
    popupInfo && (
      <Popup 
      tipSize={5}
      longitude={parseFloat(popupInfo.longitude)}
      latitude={parseFloat(popupInfo.latitude)}
      closeOnClick={false}
      onClose={() => this.setState({popupInfo: null})}
      >
      <PinCard 
      info={popupInfo}
      deletePin={this.props.onClickDelete}
      / >
      </Popup>
    )
  )
}



  render() {
    const pins = (this.props.pins)
    const { viewport } = this.state

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
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            position="top-left" />
            
            <Pins 
            data={pins}
            onClick={this.onClickMarker}
            />
            
  {this.renderPopup()}
  
          {/* Pin to show where user is zooming to */}
          <Marker
            className=""
            {...viewport} >
            <span role="img" aria-label="marker">📍</span>
          </Marker>
        </MapGl>
        <button
          className="button is-primary"
          onClick={this.handleDropPin}
        >Add Location</button>
      </>
    )
  }
}
export default Map
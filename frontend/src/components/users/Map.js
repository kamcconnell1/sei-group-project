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
  handleDropPin = () => {
    const latitude = (this.state.viewport.latitude)
    const longitude = (this.state.viewport.longitude)
    this.props.onClick()
    this.setState({ latitude, longitude }, () => {
      this.props.location(this.state.latitude, this.state.longitude)
    })
  }


  //* Sets state based on which marker you click on
  onClickMarker = (pin) => {
    this.setState({ popupInfo: pin })
  }

  deletePopup = () => {
    const id = this.state.popupInfo._id
    this.setState({ popupInfo: null },
      () => {
        this.props.onClickDelete(id)
      })
  }

  //* Popup details
  renderPopup(props) {
    const { popupInfo } = this.state

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          longitude={parseFloat(popupInfo.longitude)}
          latitude={parseFloat(popupInfo.latitude)}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PinCard
            info={popupInfo}
            deletePin={this.deletePopup}
          />
        </Popup>
      )
    )
  }
  render() {
    const pins = (this.props.pins)
    const { viewport } = this.state

    return (
      <>
        <div className="MapGL">
          <MapGl
            ref={this.myMap}
            {...viewport}
            height={'450px'}
            width={'600px'}
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

            <Marker
              className=""
              {...viewport} >
              <span role="img" aria-label="marker">📍</span>
            </Marker>
          </MapGl>
          <div className="pin-modal">
            <button
              className="Button"
              onClick={this.handleDropPin}
            >Add Location</button>
          </div>
        </div>
      </>
    )
  }
}
export default Map
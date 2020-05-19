import 'mapbox-gl/dist/mapbox-gl.css'
import "mapbox-gl/dist/mapbox-gl.css"
import React from 'react'
import MapGl, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
// import DeckGL, { GeoJsonLayer } from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'
class Map extends React.Component {
  state = {
    viewport: {
      latitude: 51.515,
      longitude: -0.078,
      zoom: 12
    },
    // state of dropped pin
    latitude: '',
    longitude: '',
    flyTo: {
      lat: '',
      lon: ''
    }
  }

  //This is required as a paramter for Geocode to work
  myMap = React.createRef()
  //This function continuously sets state as you move the viewport
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  goToViewport = ({ longitude, latitude }) => {
    this.handleViewportChange({
      longitude,
      latitude,
      zoom: 12,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto'
    })
  }
  // Sets state based on the lat / long the viewport has landed on & opens the pin form modal when you add pin. Callback function passes lat / long back up to parent
  handleDropPin = event => {
    const latitude = (this.state.viewport.latitude)
    const longitude = (this.state.viewport.longitude)
    this.props.onClick()
    this.setState({ latitude, longitude }, () => {
      this.props.location(this.state.latitude, this.state.longitude)
    })
  }
  render() {
    const pins = (this.props.pins)
    const { viewport, popupInfo } = this.state
    // console.log(viewport);
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
          // onClick={() => this.goToViewport(viewport.longitude, viewport.latitude)}
        >
          <Geocoder
            mapRef={this.myMap}
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            position="top-left" />
            {pins.map(point => (
            <div key={point._id}>
              <Marker
                latitude={parseFloat(point.latitude)}
                longitude={parseFloat(point.longitude)}
              >
                <span role="img" aria-label="marker">❇️</span>
              </Marker>
              <Popup
                latitude={parseFloat(point.latitude)}
                longitude={parseFloat(point.longitude)}
                closeButton={false}
                closeOnClick={true}
              >{point.title.charAt(0).toUpperCase() + point.title.slice(1)
                }</Popup>
            </div>
          ))}

          {/* //! If you comment below back in it is a pin to highlight user location - helpful when adding pins */}
          <Marker
            className=""
            {...viewport} >
            <span role="img" aria-label="marker">📍</span>
          </Marker>
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
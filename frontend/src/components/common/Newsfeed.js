import React from 'react'
import MapGl, { Marker } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

class Community extends React.Component{


  render() {
    return (
      <>
      <div className= "sidebar pad2">Listing</div>
      <div className="map pad2">
      <MapGl
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      height={'100vh'}
      width={'100vw'}
      mapStyle='mapbox://styles/mapbox/light-v10'
      latitude={51.515}
      longitude={-0.078}
      zoom={13}
    >

    </MapGl>
    </div>
    </>
    )
  }
}

export default Community
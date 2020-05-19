import React from 'react'
import MapGl, { Marker } from 'react-map-gl'

import Map from '../common/Map'
import GeoCodeMap from './GeoCodeMap'
import PinForm from '../users/PinForm'
import { postPin, getProfile } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'

import 'mapbox-gl/dist/mapbox-gl.css'



class UserMap extends React.Component {
  state = {
    user: null,
    pinForm: {
      title: '',
      place: '',
      location: '',
      latitude: '', 
      longitude: '',
      note: '',
      photo: ''
    },
    errors: {}
  }

  // * Function to GET the users details
  async componentDidMount() {
    try {
      const res = await getProfile()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }


  handleChange = event => {
    const pinForm = {...this.state.pinForm, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: ''}
    this.setState({ pinForm, errors })
  }
  
  
  
  // handleSubmit event for submitting the registration form
  handleSubmit = async event => {
    event.preventDefault()
    this.getLocation()
    try{
      await postPin(this.state.pinForm)
      // this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data})
      console.log(err.response.data)
    }
  }

  
  render() {

    if (!this.state.user) return null 
    console.log(this.state.user.pins);
    
    return (
      <>
        <div className="sidebar">
          <div className="container">
            <PinForm 
               handleChange={this.handleChange}
               handleSubmit={this.handleSubmit}
               errors={this.state.errors}
               {...this.state.pinForm}
               />
               <div className="pinData">
                 {/* {this.state.pins} */}
               </div>
            <div className="map">
              {/* <Map {...this.state.user.pins}/> */}
              <GeoCodeMap />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default UserMap


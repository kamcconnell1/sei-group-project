import React from 'react'
import MapGl, { Marker } from 'react-map-gl'

import Map from '../common/Map'
import PinForm from '../users/PinForm'
import { postPin } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'

import 'mapbox-gl/dist/mapbox-gl.css'



class UserMap extends React.Component {
  state = {
    pinForm: {
      title: '',
      place: '',
      location: '',
      note: '',
      photo: ''
    },
    errors: {}
  }

  handleChange = event => {
    const pinForm = {...this.state.pinForm, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: ''}
    this.setState({ pinForm, errors })
  }

  getLocation = async event => {
    try {
      const location = this.state.pinForm.location
      console.log(location);
      const response = await getPostcodeInfo(location)
      console.log('postcode info', response)
    } catch (err) {
      const errors = {...this.state.errors, location: err.response.data.error}
      console.log(err.response.data.error)
      this.setState({errors})
    }
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
    console.log(this.state);
    
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
                 {this.state.}
               </div>
            <div className="map">
              {/* <Map /> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default UserMap


import React from 'react'

import GeoCodeMap from './GeoCodeMap'

import PinForm from '../pins/PinForm'
import PinCard from '../pins/PinCard'

import { postPin, getProfile, removePin } from '../../lib/api'

import 'mapbox-gl/dist/mapbox-gl.css'



class UserMap extends React.Component {
  state = {
    user: null,
    formData: {
      title: '',
      place: '',
      latitude: '',
      longitude: '',
      note: '',
    },
    modalOpen: false,
    errors: {}
  }

  // * Function to GET the users details
  async componentDidMount() {
    try {
      this.loadMap()
    } catch (err) {
      console.log(err)
    }
  }

  loadMap = async () => {
    try {
      const res = await getProfile()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  addLocation = (latitude, longitude) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        latitude: latitude,
        longitude: longitude
      }
    }))
  }

  //Function for written input in the pin form
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }


  //Function to toggle the modal pin form open or close when user drops pin
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }


  // handleSubmit event for submitting the registration form
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await postPin(this.state.formData)
      this.loadMap()
    } catch (err) {
      this.setState({ errors: err.response.data })
      console.log(err.response.data)
    }
  }

  // handleDelete on the pin
  deletePin = async e => {
    try {
      await removePin(e.target.value)
      this.loadMap()
    } catch (err) {
      console.log(err)
    }

  }


  render() {
    if (!this.state.user) return null
    const pins = this.state.user.pins

    return (
      <>
        <div className="Page-head">
          <div className="Page-title">
            <h1>My Saved Pins</h1>
          </div>
          <div className="Page-subtitle">
            <h2>Add & save locations to remember later</h2>
          </div>
        </div>

        {/* Ternary with text showing if no pins have been saved yet  */}
        <div className="pin-details">

          {(pins.length === 0) ?
            <div className="container">
                <h1>Looks like you haven't saved any locations yet, add now.</h1>
                </div>
               :
              <div className="map-pins">
                {pins.map(pin =>
                  <PinCard
                    key={pin._id}
                    {...pin}
                    deletePin={this.deletePin}
                  />
                )}
              </div>
              }

          <div className="map-page">
            <div className="container">
              <GeoCodeMap
                onChange={this.handleChange}
                onClick={this.toggleModal}
                pins={this.state.user.pins}
                location={this.addLocation}
                name="location" />
            </div>


            {/* PinForm will pop up if a user decides to drop a pin on thr map */}
            <PinForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              onClick={this.toggleModal}
              errors={this.state.errors}
              modalStatus={this.state.modalOpen}
              {...this.state.formData}
            />

            {/* GeoCodeMap - for user to view locations & drop pins */}
          </div>
          <div className="map pad2">
          </div>
        </div>

      </>
    )
  }
}

export default UserMap


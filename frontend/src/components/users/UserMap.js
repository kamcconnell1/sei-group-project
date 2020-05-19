import React from 'react'

import GeoCodeMap from './GeoCodeMap'
import PinForm from '../users/PinForm'
import TestGeoJSON from '../users/TestGeoJSON'
import { postPin, getProfile } from '../../lib/api'

import 'mapbox-gl/dist/mapbox-gl.css'



class UserMap extends React.Component {
  state = {
    user: null,
    formData: {
      title: '',
      place: '',
      location: '',
      latitude: '',
      longitude: '',
      note: '',
      photo: ''
    },
    modalOpen: false,
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
      // this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data })
      console.log(err.response.data)
    }
  }


  render() {

    if (!this.state.user) return null
    console.log(this.state.user.pins)
    const pins = this.state.user.pins

    return (
      <>
      {/* <TestGeoJSON {...this.state.user.pins} /> */}
         <section className="section">
            <div className="container">
              <h1 className="title">User Map</h1>
              <h2 className="subtitle">
                Saved locations & items
              </h2>
            </div>
          </section>
        <div className="sidebar pad2">
          <div className="container">
          <p>Your Saved Locations</p>

            <p>{pins[0].title}</p>
            <p>{pins[0].place}</p>
            <p>{pins[0].notes}</p>

            <PinForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              onClick={this.toggleModal}
              errors={this.state.errors}
              modalStatus={this.state.modalOpen}
              {...this.state.formData}
            />

          </div>
          <div className="map pad2">
            <div className="container">
              <GeoCodeMap
                onChange={this.handleChange}
                onClick={this.toggleModal}
                pins={this.state.user.pins}
                name="location" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default UserMap


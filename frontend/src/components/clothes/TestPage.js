import React from 'react'

// ? import Modal from 'react-responsive-modal'



class TestPage extends React.Component {
  state = {sign: false, register: false}

  onOpenRegister = () => {
    this.setState({sign: true})
  }

  onOpenLogin = () => {
    this.setState({login: true})
  }

  onCloseRegister = () => {
    this.setState({register: false})
  }

  onCloseLogin = () => {
    this.setState({login: false})
  }


  render() {
    const {login, register} = this.state
    return (
    
    <h1>Star rating</h1>
    )
  }
}

export default TestPage
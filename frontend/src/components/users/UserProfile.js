import React from 'react'

// ! User profile, GETs data for user on mount

class UserProfile extends React.Component {
  state = {
    user: {
      welcome: '',
      username: '',
      postcode: '',
      articlesPosted: null,
      userRating: null
    }
  }


  // ! Function to find user by Id and then GET the users details
  componentDidMount() {
    const userId = this.props.match.params.id
    console.log(userId)
  }

// * function to push the user to clothes add page if they want to add a new item 
handleClick= () => {
  const userId = this.props.match.params.id
  this.props.history.push(`/user/${userId}/add`)
  
}

  render() {
    console.log(this.state.user)
    return (

      <>

        <section className="section">
          {/* //!Personalise this part to the user */}
          <h1 className="title">Welcome Username</h1>
          <div className="container">
            <div className="columns">
              <div className="column ">
            <div className="control">
                User Details
              </div>
              <button className="button is fullwidth"
              onClick={this.handleClick}
              >Add Clothes Now</button>
              </div>
              <div className="column">
                <div className="control">
                User Clothes Added - map function with clothes card
                </div>
            <div className="control">
                Saved Location Map - would need to pull from mapGL
            </div>
            </div>
              <div className="column">
                Incoming Notifications
          </div>
            </div>
          </div>
        </section>


      </>

    )
  }
}


export default UserProfile


import React from 'react'

class ClothesShow extends React.Component {
  render() {
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Item show page
      </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <p>Picture goes here</p>
                </figure>
              </div>
              <div>
                <p>Description</p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ClothesShow
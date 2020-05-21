import React from 'react'
import { Link } from 'react-router-dom'

class About extends React.Component {

  render() {
    return (
      <>
        <div className="Page-head">
          <div className="Page-title">
            <h1>KEBB Bazaar</h1>
          </div>
          <div className="Page-subtitle">
            <h2>A place to borrow, lend & be inspired.</h2>
          </div>
        </div>

        <div className="About column-center">

          <div className="About-row">
            <div className="Our-mission column-center">
              <h3 className="Title">Our Mission</h3>
              <h4 className="Subtitle">
                In a world where fast fashion is destroying the planet we are on a mission to connect people and strive for a more sustainable future. KEBB gives you the chance to let others enjoy your clothes as much as you do.</h4>
            </div>
            <img src="https://img.huffingtonpost.com/asset/5c94befb230000c800e9f38b.jpeg?ops=scalefit_720_noupscale&format=webp" alt="woman lookin at clothes" />

            <div className="How-it-works column-center">
              <h3 className="Title">HOW IT WORKS</h3>
              <ul className="Subtitle">
                <li>Browse through all the items uploaded online</li>
                <li>See something you like? Drop the owner a direct message requesting to borrow</li>
                <li>Upload your on clothes & start making money on your wardobe.</li>
              </ul>
            </div>
          </div>
          <div className="Join-us Title">
            <p><Link to="/register">Join us </Link> now and see where your new wardrobe could take you!</p>
            <div className="container">
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default About
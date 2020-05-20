import React from 'react'
import { Link } from 'react-router-dom'
import { allUsersFavourites, deleteArticleFromFavs } from '../../lib/api'

class FavouriteItem extends React.Component {
  state = { items: null }

  async componentDidMount() {
    try {
      await this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  getPosts = async () => {
    try {
      const res = await allUsersFavourites()
      this.setState({ items: res.data.favArticles })
    } catch (err) {
      console.log(err)
    }
  }

  removeFromFavs = async e => {
    try {
      console.log(e.target.value)
      await deleteArticleFromFavs(e.target.value)
      this.getPosts()
    } catch (err) {
      console.log(err)
    }

  }


  render() {
    if (!this.state.items) return <h1>The Ninjas went to get you some Pizza</h1>
    const { items } = this.state
    return (
      <>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Favourite Items
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {items.map(item =>
                <div key={item._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                  <div className="card">
                    <Link to={`/clothes/${item._id}`}>
                      <div className="card-header">
                      </div>
                      <div className="card-image">
                        <figure className="image image is-1by1">
                          <img src={item.image[0]} alt={item.title} loading="lazy" width="255" height="255" />
                        </figure>
                      </div>
                      <div className="card-content">
                        <h4 className=""><strong>{item.title}</strong></h4>
                        <h5 className=""><strong>Rental Price:</strong> {`£${item.rentalPrice}`}</h5>
                      </div>
                    </Link>
                  </div>
                  <button onClick={this.removeFromFavs} value={item._id}>Remove this post</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default FavouriteItem
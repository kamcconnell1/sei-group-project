import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import SecureRoute from './components/common/SecureRoute'
import Error from './components/common/Error'
import Home from './components/common/Home'
import About from './components/common/About'
import Newsfeed from './components/common/Newsfeed'
import ClothesAdd from './components/clothes/ClothesAdd'
import ClothesIndex from './components/clothes/ClothesIndex'
import ClothesShow from './components/clothes/ClothesShow'


import UserProfile from './components/users/UserProfile'
import UserMap from './components/users/UserMap'
import userShowProfile from './components/users/userShowProfile'
import FavouriteFriends from './components/users/FavouriteFriends'
import FavouriteItems from './components/users/FavouriteItems'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Posts from './components/posts/Posts'
import PostsShow from './components/posts/PostsShow'
import PostEdit from './components/posts/PostEdit'


const App = () => {


  return (
    <BrowserRouter>
    <Navbar className="Navbar" />
    <div className="Main column-center">
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/page/:id' component={userShowProfile} />
    <SecureRoute path='/profile/:username/add' component={ClothesAdd} />
    <SecureRoute path='/profile/:username/friends' component={FavouriteFriends} />
    <SecureRoute path='/profile/:username/favourites' component={FavouriteItems} />
    <Route path='/profile/:username/map' component={UserMap} />
    <Route path='/profile/:username' component={UserProfile} />
    <Route path='/clothes/:id' component={ClothesShow} />
    <Route path='/clothes' component={ClothesIndex} />
    <Route path='/newsfeed' component={Newsfeed} />
    <Route path='/about' component={About} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/posts/:id/edit' component={PostEdit} />
    <Route path='/posts/:id' component={PostsShow} />
    <Route path='/posts' component={Posts} />
    <Route path="/*" component={Error} />
    </Switch>
    </div>
    <Footer className="Footer" />
    </BrowserRouter>
  )
}

export default App

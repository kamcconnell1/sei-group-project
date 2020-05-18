import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'
import Error from './components/common/Error'
import Home from './components/common/Home'
import About from './components/common/About'
import Newsfeed from './components/common/Newsfeed'
import ClothesAdd from './components/clothes/ClothesAdd'
import ClothesIndex from './components/clothes/ClothesIndex'
import ClothesShow from './components/clothes/ClothesShow'
import TestPage from './components/clothes/TestPage'


import UserProfile from './components/users/UserProfile'
import UserMap from './components/users/UserMap'
import userShowProfile from './components/users/userShowProfile'

import Register from './components/auth/Register'
import Login from './components/auth/Login'


const App = () => {


  return (
    <BrowserRouter>
    <Navbar />
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/page/:id' component={userShowProfile} />
    <SecureRoute path='/profile/:username/add' component={ClothesAdd} />
    <Route path='/profile/:username/map' component={UserMap} />
    <Route path='/profile/:username' component={UserProfile} />
    <Route path='/clothes/:id' component={ClothesShow} />
    <Route path='/clothes' component={ClothesIndex} />
    <Route path='/newsfeed' component={Newsfeed} />
    <Route path='/about' component={About} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/test' component={TestPage} />
    <Route path="/*" component={Error} />
    </Switch>
    </BrowserRouter>
  )
}

export default App

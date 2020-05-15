import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import About from './components/clothes/About'
import ClothesAdd from './components/clothes/ClothesAdd'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/about' component={About} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='user/:id/add' component={ClothesAdd} />
    </Switch>
    </BrowserRouter>
  )
}

export default App

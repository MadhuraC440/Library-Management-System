import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Category from './components/Category'
import Home from './components/Home'
import Logout from './components/Logout'
import Transactions from './components/Transactions'
const App = () => {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/categories' element={<Category/>}></Route>
      <Route path='/home'element={<Home/>}></Route>
      <Route path='/logout'element={<Logout/>}></Route>
       <Route path='/transactions'element={<Transactions/>}></Route>
    </Routes>
  </BrowserRouter>

  </>
}

export default App
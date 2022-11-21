import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import AllPlaces from './pages/AllPlaces'
import SinglePlace from './pages/SinglePlace'
import NewPlace from './pages/NewPlace'

import Admin from './pages/admin/Admin'
import EditPlace from './pages/admin/EditPlace'


//Autentifikacijos komponentai


import Login from './pages/Login'
import Register from './pages/Register'

//Kontekstas
import MainContext from './context/MainContext'

//Baziniai komponentai
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import './App.css';

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  // useEffect(() => {
  //   axios.get('/api/users/check-auth/')
  //   .then(resp => {
  //     setUserInfo(resp.data)
  //   })
  // }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/edit/:id" element={<EditPlace />} />
  

            <Route path="" element={<AllPlaces />} />


             <Route path="places/single/:id" element={<SinglePlace />} />
             <Route path="places/new" element={<NewPlace />} />



            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> 
            
            <Route path="*" element={<Login />} /> 
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App

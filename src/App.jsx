import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'
import Courses from './pages/Courses/Courses'
import Footer from './components/Footer/Footer'
import About from './pages/About/About'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import Auth from './pages/Auth/Auth'
import Account from './pages/Account/Account'
import Register from './pages/Register/Register'
import UserCoursesContextProvider from './context/UserCoursesContext'


function App() {

  return (
    <BrowserRouter>
    <UserCoursesContextProvider>
    <Header/>

    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/aboutus' element={<About/>}/>
      <Route path='/coursedetails/:id' element={<CourseDetails/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/account/:user' element={<Account/>}/>
      <Route path='/register/:course' element={<Register/>}/>
    </Routes>

    <Footer/>
    </UserCoursesContextProvider>
    </BrowserRouter>
  )
}

export default App

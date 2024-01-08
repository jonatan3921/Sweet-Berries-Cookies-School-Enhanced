import React, {useState, useEffect} from 'react'
import './Homepage.css'
import banner from '../../assets/banner.png'
import {PiKnife, PiCookingPot, PiClipboardText, PiLeaf, PiHamburger } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';





function Homepage() {
  const navigate = useNavigate()
  const icons = [
    {
      icon: <PiKnife className='icon'/>
    },
    {
      icon: <PiCookingPot className='icon'/>
    },
    {
      icon: <PiClipboardText className='icon'/>
    },
    {
      icon: <PiLeaf className='icon'/>
    },
    {
      icon: <PiHamburger className='icon'/>
    }
  ]
  const [courses, setCourses] = useState([])

  useEffect(
    () => {
      // Variable to reference the courses collection
      const coursesRef = collection(db, 'courses');

      // Get courses from the database
      getDocs(coursesRef)
      .then(res => {
        const articles = res.docs.map(item => {
          return {
            ...item.data(),
            id: item.id,
          }
        })
        console.log(articles)
        setCourses(articles)
      })
      .catch(err => console.log(err))
    }, []
  )

  return (
    <div className='homepage-page'>
        <div className='banner'>
            <div className='banner-heading'>
                <h1>Discover Your Perfect Online Cooking Course</h1>
                <p>All our courses are designed to give you an exceptional learning experience, with hands-on video sessions and personal mentorship from expert Sweet Berries instructors.</p>
            </div>
            <img src={banner} alt='banner'/>
        </div>
        <div className='cards-container'>
          <div className='card special-card'>
            <Link className='explore' to={'/courses'}><h2>Explore our most popular cooking courses!</h2></Link>
          </div>
          {
            courses.map(item => 
              <div className='card offer'>
                <h3>{item.title}</h3>
                <p>{item.quickDescription}</p>
                <button onClick={() => navigate(`/coursedetails/${item.id}`)}>Get Started</button>
                {
                  icons[item.id -1].icon
                }
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Homepage
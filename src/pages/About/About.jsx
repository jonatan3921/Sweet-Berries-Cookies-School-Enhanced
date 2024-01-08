import React, {useState, useEffect} from 'react'
import './About.css'
import banner from '../../assets/banner.png'
import logo from '../../assets/logo.svg'
import {PiKnife, PiCookingPot, PiClipboardText, PiLeaf, PiHamburger } from 'react-icons/pi';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

function About() {
  const icons = [
    {
      icon: <PiKnife className='about-icon'/>
    },
    {
      icon: <PiCookingPot className='about-icon'/>
    },
    {
      icon: <PiClipboardText className='about-icon'/>
    },
    {
      icon: <PiLeaf className='about-icon'/>
    },
    {
      icon: <PiHamburger className='about-icon'/>
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
    <div className='about-page'>
        <div className='about-banner'>
            <img src={logo} alt="logo" />
            <img src={banner} alt="banner" />
        </div>
        <h2>About</h2>
        <div className='about-description'>
            <p>At Sweet Berries, we take pride in curating a diverse range of culinary courses tailored to various age groups and preferences. Explore our offerings to discover the course that aligns perfectly with your culinary aspirations.</p>
            <p>Our team comprises seasoned culinary experts dedicated to imparting the art of cooking. Receive personalized guidance, valuable tips, and have your queries addressed by our knowledgeable instructors—all within the convenience of your own home. Embark on a culinary journey with Sweet Berries and refine your cooking skills with the expertise of our accomplished teachers.</p>
        </div>
        <h2>Courses</h2>
        <div className='about-courses'>
            {
              courses.map(item => 
                  <div className='about-course-box'>
                    <div>
                      <h2>{item.title}</h2>
                      {
                        icons[item.id -1].icon
                      }
                    </div>
                    <p>{item.description1}</p>
                    <p>{item.description2}</p>
                  </div>
              )
            }
        </div>
    </div>
  )
}

export default About
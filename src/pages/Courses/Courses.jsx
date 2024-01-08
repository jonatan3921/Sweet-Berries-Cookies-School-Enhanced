import React, {useState, useEffect} from 'react'
import './Courses.css'
import {PiKnife, PiCookingPot, PiClipboardText, PiLeaf, PiHamburger } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

function Courses() {
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
    <div className='courses-page'>
      <div className='courses-container'>
        <div className='courses-heading'>
          <h2>Our school offers the best online cooking classes</h2>
        </div>
        <div className='cards-container'>
          {
            courses.map(item => 
                <div className={`card offer ${item.id == 2 ? 'cooking-essentials' : null} ${item.id == 5 ? 'teen-kitchen' : null}`}>
                  <h3>{item.title}</h3>
                  <p>{item.quickDescription}</p>
                  <button onClick={() => navigate(`/coursedetails/${item.id}`)}>Get Started</button>
                  {
                    icons[item.id -1].icon
                  }
                </div>
            )
          }
          {}
        </div>
      </div>
    </div>
  )
}

export default Courses
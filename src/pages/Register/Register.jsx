import React, {useState, useEffect, useContext} from 'react'
import './Register.css'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import { UserCoursesContext } from '../../context/UserCoursesContext';


function Register() {
    const {course} = useParams();
    const navigate = useNavigate();
    const {addCourse} = useContext(UserCoursesContext)

    // Get the user Data
    const [user] = useAuthState(auth);

    const [currentCourse, setCurrentCourse] = useState({})
    

    // Need to get details for this course from the database
    useEffect(
        () => {
          // Set up a reference to a single doct with the articledId
          const docRef = doc(db, 'courses', course)

          getDoc(docRef)
          .then(res => {
            console.log(res.data())
            setCurrentCourse(res.data())
          })
          .catch(err => console.log(err))
        }, []
    )

    const handleRegistration = (course) => {
      addCourse(course)
      navigate(`/account/${user}`)
    }

  return (
    <div className='register-page'>
        <div className='register-container'>
            <h2>{currentCourse?.title}</h2>
            <p><span>Welcome to {currentCourse?.title} Online Course, {user?.displayName}.</span></p>
            <p>To complete your registration, we kindly request additional details to ensure we can accommodate you effectively and tailor our services to your specific needs. Your cooperation in providing the following information is greatly appreciated as we strive to deliver a personalized and seamless experience. Thank you for your attention to this matter.</p>

            <form>
              <div>
                <label htmlFor='schedule'>Choose the schedule </label>
                <select name='schedule'>
                  <option>Morning</option>
                  <option>Evening</option>
                </select>
                
                <label htmlFor='dob'>Date of Birth</label>
                <input type='date' name='dob'/>
              </div>
              <div>
                <textarea placeholder='What you wish to accomplish in this course?'></textarea>
              </div>    
              <div>
                <button onClick={() => handleRegistration(currentCourse)}>Send Registration</button>  
              </div>    
            </form>
        </div>
    </div>
  )
}

export default Register
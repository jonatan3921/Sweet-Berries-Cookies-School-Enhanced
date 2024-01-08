import React, {useContext} from 'react'
import './Account.css'
import { auth } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { UserCoursesContext } from '../../context/UserCoursesContext'

function Account() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const {userCourses, removeCourse} = useContext(UserCoursesContext)

    const handleSignOut = () => {
      signOut(auth);
      navigate('/')
    }



  return (
    <div className='account-page'>
        <div className='user-container'>
            <h2>Your Account</h2>
            <div className='user-info-container'>
              <div className='user-info'>
                <p><span>Name:</span> {user.displayName && user.displayName}</p>
                <p><span>Email:</span> {user.email}</p>
              </div>
              <div className='user-courses'>
                <p>My Courses</p>
                {
                  userCourses 
                  ? userCourses.map(item => <p className='courses-own' onClick={() => removeCourse(item?.id)}>{item?.title}</p>)
                  : <p>No Courses Added</p>
                }
              </div>
            </div>
            <button onClick={handleSignOut}>Log out</button>
        </div>
    </div>
  )
}

export default Account
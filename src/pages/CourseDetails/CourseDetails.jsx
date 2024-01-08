import React, {useState, useEffect} from 'react'
import './CourseDetails.css'
import { useParams, useNavigate } from 'react-router-dom'
import {PiKnife, PiCookingPot, PiClipboardText, PiLeaf, PiHamburger } from 'react-icons/pi';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'

function CourseDetails() {
  const navigate = useNavigate()
    const courses = [
        {
          title: 'Chef Skills',
          quickDescription: 'Master the skills and techniques that will take your culinary abilities to the next level and help you excel in the food industry.',
          icon: <PiKnife className='about-icon'/>,
          id: 1,
          description1: 'Welcome to our Online Chef Skills Course, an immersive and comprehensive program meticulously designed to elevate culinary enthusiasts to the level of accomplished chefs. Led by seasoned culinary professionals, this course transcends traditional boundaries, offering a dynamic and interactive learning experience tailored to participants seeking mastery in the culinary arts.',
          description2: 'Embark on a transformative journey toward culinary excellence with our Online Chef Skills Course. Enroll today to unlock the secrets of the culinary world, refine your techniques, and position yourself on the path to becoming a seasoned culinary professional. Join us in crafting culinary masterpieces and defining the art of gastronomy in the digital age.'
        },
        {
          title: 'Cooking Essentials',
          quickDescription: 'Learn the essential skills and techniques that will lead to a lifetime of restaurant-quality cooking.',
          icon: <PiCookingPot className='about-icon'/>,
          id: 2,
          description1: 'Welcome to our Online Cooking Essentials Course, a meticulously curated culinary experience designed to equip participants with a comprehensive foundation in the art of cooking. Led by accomplished culinary experts, this course transcends traditional boundaries, delivering an immersive and flexible learning journey tailored to your pace and preferences.',
          description2: 'Secure your spot in our Online Cooking Essentials Course today and embark on a culinary journey that transcends geographical constraints. Elevate your cooking skills, explore your culinary passion, and unlock a world of culinary possibilities from the comfort of your own kitchen. Enroll now to begin your path to culinary mastery.'
        },
        {
          title: 'Nutrition in Cooking',
          quickDescription: 'Master cookery and nutrition skills for health and wellbeing with this 20-week Accredited Online Nutrition Course.',
          icon: <PiClipboardText className='about-icon'/>,
          id: 3,
          description1: 'Welcome to our Online Nutrition in Cooking Course, a meticulously designed program that blends the art of culinary creation with a deep understanding of nutritional principles. Led by seasoned nutritionists and culinary experts, this course is tailored to individuals seeking to enhance their culinary skills while embracing a health-conscious approach to cooking.',
          description2: 'Secure your enrollment in our Online Nutrition in Cooking Course today and embark on a transformative journey towards culinary excellence and nutritional well-being. Empower yourself with the skills to create delicious, health-conscious meals that nourish the body and delight the palate. Enroll now to elevate your culinary and nutritional expertise.'
        },
        {
          title: 'Plant-Based Cooking',
          quickDescription: 'Learn the skills and techniques that will lead to a lifetime of plant-based and planet-friendly meals.',
          icon: <PiLeaf className='about-icon'/>,
          id: 4,
          description1: 'Welcome to our Online Plant-Based Cooking Course, a comprehensive culinary journey meticulously crafted to inspire and empower individuals to explore the world of plant-based cuisine. Led by seasoned chefs with expertise in plant-based nutrition, this course combines culinary artistry with a focus on health-conscious, plant-centric culinary practices.',
          description2: 'Secure your enrollment in our Online Nutrition in Cooking Course today and embark on a transformative journey towards culinary excellence and nutritional well-being. Empower yourself with the skills to create delicious, health-conscious meals that nourish the body and delight the palate. Enroll now to elevate your culinary and nutritional expertise.'
        },
        {
          title: "Teen's Kitchen",
          quickDescription: "Teen's Kitchen is a 6-week immersive and interactive online cookery course and certificate exclusively for young adults aged 13-18.",
          icon: <PiHamburger className='about-icon'/>,
          id: 5,
          description1: "Welcome to our Online Teen's Kitchen Course, a thoughtfully crafted culinary program designed to ignite a passion for cooking among teenagers. Led by skilled chefs and educators, this course is tailored to empower teens with fundamental culinary skills, fostering creativity in the kitchen while promoting a lifelong appreciation for wholesome and delicious meals.",
          description2: "Empower the young chef in your household by enrolling them in our Online Teen's Kitchen Course. Together, we'll embark on a culinary adventure, cultivating a love for cooking that extends well beyond the course. Enroll today to nurture creativity, instill valuable life skills, and foster a lifelong passion for the culinary arts."
        }
    ]
    const {id} = useParams()

    // Get the user Data
    const [user] = useAuthState(auth);

    const [currentCourse, setCurrentCourse] = useState({})

    // Need to get details for this course from the database
    useEffect(
        () => {
          // Set up a reference to a single doct with the articledId
          const docRef = doc(db, 'courses', id)

          getDoc(docRef)
          .then(res => {
            console.log(res.data())
            setCurrentCourse(res.data())
          })
          .catch(err => console.log(err))
        }, []
    )

  return (
    <div className='course-details-page'>
      <h1>{currentCourse?.title}</h1>
      <h3>{currentCourse?.quickDescription}</h3>
      <p className='course-description1'>{currentCourse?.description1}</p>
      <div className='course-overview'>
        <ol className='features-container'>
          <h2>Features:</h2>
          {
            currentCourse?.features
            ? currentCourse?.features.map(item => 
              <li className='feature'>{item}</li>
            )
            : null
          }
        </ol>
        <div className='signup-container'>
          <p>{currentCourse?.description2}</p>
          <button onClick={() => navigate(user ? `/register/${id}` : '/auth' )}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
import {useState, createContext, useEffect} from 'react'

//create context using hook
export const UserCoursesContext = createContext()

export default function UserCoursesContextProvider(props) {
    // Create Global state here
    const [userCourses, setUserCourses] = useState([])

    useEffect (
        () => {
            // Is there a value in localStorage
            const storedCourses = localStorage.getItem('userCourses')
            // Only use if there was a value
            if(storedCourses) {
                // Use this to initialize
                setUserCourses(JSON.parse(storedCourses))
            }
        }, []
    )

    useEffect (
        () => {
            // Save new value to localStorage
            localStorage.setItem('userCourses', JSON.stringify(userCourses))
        }, [userCourses] //Runs anytime userCourses changes
    )

    const addCourse = (courseToAdd) => {
        console.log('adding', courseToAdd)
        // add courseToAdd to userCourses
        let newUserCourses = [...userCourses, courseToAdd]
        console.log(newUserCourses)
        // replace state
        setUserCourses(newUserCourses);
    }

    const removeCourse = (courseId) => {
        console.log('remove', courseId)
        // remove courseId
        // Keep all the ones that are not courseId
        let newUserCourses = userCourses.filter(item => item.id != courseId)
        //replace state
        setUserCourses(newUserCourses)
    }

    return(
        <UserCoursesContext.Provider value={{userCourses, addCourse, removeCourse}}>
            {props.children}
        </UserCoursesContext.Provider>
    )
}
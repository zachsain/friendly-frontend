import React, {useState, useEffect, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './ProfilePage.module.css'



function ProfilePage() {

    const [profile, setProfile] = useState(null)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:3000/profiles/${id}`)
        .then((r) => r.json())
        .then((p) => {
            setProfile(p);
        })
        .catch((error) => {
        console.log('An error occurred:', error);
  });
    }, [id])

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const diffInMs = Date.now() - dob.getTime();
        const ageDate = new Date(diffInMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
    function handleClick(){
      history.push('/')
    }
      
    if (!profile){
        return (
            <div>Loading...</div>
        )
    }
    const age = calculateAge(profile.dob);
  return (
    <div>
        <div onClick={handleClick} className={styles.userProfile}>
            <div className={styles.userProfile__image-container}>
            <imgage className={styles.userProfile__image} src={profile.featured_image.url} alt="profile-photo" />
            <h1 className={styles.userProfile__h1}>{profile.first_name}, {age} </h1>
            </div>
            <p className={styles.userProfile__p}>{profile.bio}</p>
        </div>

    </div>
  )
}

export default ProfilePage
import React, {useState, useEffect, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ProfilePage.css';


function ProfilePage() {

    const [profile, setProfile] = useState(null)
    const { id } = useParams()
    const history = useHistory()

    console.log(id)

    useEffect(() => {
        fetch(`/profiles/${id}`)
        .then((r) => r.json())
        .then((p) => {
            setProfile(p);
        })
        .catch((error) => {
        console.log('An error occurred:', error);
  });
    }, [])

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
        <div onClick={handleClick} className="userProfile">
            <div className="userProfile__image-container">
            <img className="userProfile__image" src={profile.featured_image.url} alt="profile-photo" />
            <h1 className="userProfile__h1">{profile.first_name}, {age} </h1>
            </div>
            <p className="userProfile__p">{profile.bio}</p>
        </div>

    </div>
  )
}

export default ProfilePage
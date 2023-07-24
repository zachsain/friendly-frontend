import React, { useState, useEffect, useContext } from 'react'
import AppContext from './AppContext';
import TinderCard from 'react-tinder-card';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import Modal from 'react-modal';
import ProfileEditForm from './ProfileEditForm';
import Settings from './Settings';
// import styles from './Settings.modules.css'
import styles from './UserProfile.module.css'


function UserProfile() {
    const { user, setIsOnUserProfile, showLogout, setShowLogout } = useContext(AppContext);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    useEffect(() => {
      setIsOnUserProfile(true)
    }, [])

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const diffInMs = Date.now() - dob.getTime();
        const ageDate = new Date(diffInMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
      const age = calculateAge(user.profile.dob);

    function handleEditClick(){
        setIsEditFormVisible(!isEditFormVisible)
    }

    function handleLogoutModal(){
      setShowLogout(false)
    }

    return (
      <div>
        <div onClick={handleEditClick} className={styles.userProfile}>
        <div className={styles.userProfile__image-container}>
          <imgage className={styles.userProfile__image} src={user.profile.featured_image.url} alt="profile-photo" />
          <h1 className={styles.userProfile__h1}>{user.profile.first_name}, {age}</h1>
        </div>
        <p className={styles.userProfile__p}>{user.profile.bio}</p>
        </div>
        <Modal className={styles.edit}  isOpen={isEditFormVisible} onRequestClose={handleEditClick} appElement={document.getElementById('root')}>
          <ProfileEditForm
            setIsEditFormVisible={setIsEditFormVisible}
            fn={user.profile.first_name}
            ln={user.profile.last_name}
            b={user.profile.bio}
            imageUrl={user.profile.featured_image.url}
          />
        </Modal>
        <div >
        <Modal className={styles.show__settings} isOpen={showLogout} onRequestClose={handleLogoutModal} appElement={document.getElementById('root')}>
          <Settings/>
        </Modal>
        </div>

      </div>
    )
    
}

export default UserProfile


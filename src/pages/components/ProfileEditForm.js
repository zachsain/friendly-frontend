import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import {useHistory} from "react-router-dom";
import { imageListClasses } from '@mui/material';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styles from './ProfileEditForm.module.css'


function ProfileEditForm({imageUrl, setIsEditFormVisible}) {
  const {user, setUser} = useContext(AppContext);
  const [firstName, setFirstName] = useState(user.profile.first_name);
  const [lastName, setLastName] = useState(user.profile.last_name);
  const [errors, setErrors] = useState('');
  const [bio, setBio] = useState(user.profile.bio);
  const [image, setImage] = useState(user.profile.featured_image.url);
  const [displayImage, setDisplayImage] = useState(user.profile.featured_image.url);
  const history = useHistory();
  
  console.log(image)

  function handleEdit(e) {
    e.preventDefault();
    setErrors([]);
  
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('bio', bio);
  
    // Check if image has changed
    if (image && image !== imageUrl) {
      formData.append('featured_image', image);
    }
  
    fetch(`http://localhost:3000/users/${user.id}/profile`, {
      method: 'PATCH',
      body: formData,
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user);
            console.log(user);
            setIsEditFormVisible(false)
            // history.push('/')
          });
        } else {
          r.json().then((error) => {
            setErrors(error.error);
          });
        }
      });
  }
  

//   function onImageChange(e){
//     console.log(e.target.files[0])
//     setImage(e.target.files[0]);
//     setDisplayImage(e.target.files[0])
// }

// testing 

function onImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    setImage(file);
    setDisplayImage(URL.createObjectURL(file));
  }
}
  return (
    <div className={styles.edit-form-container}>
        <form className={styles.edit-form} >

          <IconButton className={styles.back-button-icon} onClick={() => setIsEditFormVisible(false)}>
            <ArrowBackOutlinedIcon />
          </IconButton>

        {/* <h2 className="edit-heading">Edit Profile:</h2> */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className={styles.edit-input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className={styles.edit-input}
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className={styles.edit-input}
          id={styles.bio}
        ></textarea>

        {/* <input className="image-field" type="file" accept="image/*" multiple={false} onChange={onImageChange} /> */}
        <input
          className={styles.image-field}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onImageChange}
        />
        <imgage className={styles.userEdit__image} src={displayImage} alt="profile-photo" />

        <button type="submit" className={styles.edit-submit-button} onClick={handleEdit}>
          Update
        </button>
        {errors && <p className={styles.signup-error}>{errors}</p>}
      </form>
    </div>
  )
}

export default ProfileEditForm
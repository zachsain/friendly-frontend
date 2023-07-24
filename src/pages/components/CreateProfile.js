import React, { useEffect, useState }  from 'react'
import Signup from "./SignupForm";
import styles from './SignupForm.module.css'


function CreateProfile() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState('');
    const [showErrors, setShowErrors] = useState('')

    function handleCreateProfile(e) {
      e.preventDefault()

    }

    function onImageChange(e){
        setImage(e.target.files[0]);
    }
    
  return (
    <div>
     <div className={styles.signup-container}>
      <form className={styles.signup-form}>
        <h2 className={styles.signup-heading}>Create Profile</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className={styles.signup-input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className={styles.signup-input}
        />
         <input
          type="bio"
          placeholder="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className={styles.signup-input}
        />
        <input type="file" accept="image/*" multiple={false} onChange={onImageChange} />

        <button type="submit" className={styles.signup-button} onClick={handleCreateProfile}>
          Create
        </button>
        {errors && <p className={styles.signup-error}>{errors}</p>}
      </form>
    </div>


    </div>
  )
}

export default CreateProfile
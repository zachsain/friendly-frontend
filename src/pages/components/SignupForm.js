import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useHistory} from "react-router-dom";
import styles from './SignupForm.modules.css'

function SignupForm({ setUser, setLoginOrSignup, setIsLoggedIn, setIsOnUserProfile}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Other'];
  const history = useHistory();

  function handleSignup(e) {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("featured_image", image);

    fetch('/signup', {
      method: 'POST',
      body: formData
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log(user);
          history.push('/')
          setIsLoggedIn(true)
          setIsOnUserProfile(false)

        });
      } else {
        r.json().then((error) => {
          setErrors(error.error);
        });
      }
    });
  }

  function onImageChange(e){
    setImage(e.target.files[0]);
    
}

  function handleGenderChange(e){
    setGender(e.target.value);
  }

  function handleDobChange(date) {
    setDob(date);
  }
 
  return (
    <div className={styles.signup-container}>
      <form className={styles.signup-form} >
        <h2 className={styles.signup-heading}>Sign up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={styles.signup-input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.signup-input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.signup-input}
        />
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
        <label htmlFor="gender">Gender:</label>
        {/* id question? */}
          <select id="gender" name="gender" value={gender} onChange={handleGenderChange}> 
          <option value="">Select Gender</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className={styles.dob}>
          <label className={styles.dob-label} htmlFor="dob">DOB:</label>
              <DatePicker
              id="dob"
              selected={dob}
              onChange={handleDobChange}
              dateFormat="MM/dd/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              />
        </div>

        <input className={styles.image-field} type="file" accept="image/*" multiple={false} onChange={onImageChange} />

        <button type="submit" className={styles.signup-button} onClick={handleSignup}>
          Sign up
        </button>
        <h4>Already have an account?</h4>
        <button onClick={() => setLoginOrSignup(true)} type="submit" className={styles.signup-button}>
          Login
        </button>
        {errors && <p className={styles.signup-error}>{errors}</p>}
      </form>
    </div>
  );
};

export default SignupForm;



import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import styles from './Login.module.css'

function Login({ setUser, setChatPageRender, setIsLoggedIn, setIsOnUserProfile, setShowLogout }) {
    const [loginOrSignup, setLoginOrSignup] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className={styles.login}>
        {loginOrSignup ? 
            ( 
            <div>
                <LoginForm 
                  setShowLogout={setShowLogout} 
                  setIsOnUserProfile={setIsOnUserProfile} 
                  setIsLoggedIn={setIsLoggedIn} 
                  setChatPageRender={setChatPageRender} 
                  setUser={setUser} 
                  setLoginOrSignup={setLoginOrSignup} 
                />
                <br />
            </div>
            ) 
            : 
            (
            <div>
                <SignupForm 
                  setIsOnUserProfile={setIsOnUserProfile} 
                  setIsLoggedIn={setIsLoggedIn} 
                  setChatPageRender={setChatPageRender} 
                  setUser={setUser} 
                  setLoginOrSignup={setLoginOrSignup}  
                />
                <br />
            </div>
            )}
    </div>
  )
}

export default Login
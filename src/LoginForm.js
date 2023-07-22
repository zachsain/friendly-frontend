import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import { useHistory } from "react-router-dom";
import './LoginForm.css'

function LoginForm({ setUser, setLoginOrSignup, setShowLogout, setChatPageRender, setIsLoggedIn, setIsOnUserProfile }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const history = useHistory();

  
    function handleLogin(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            history.push('/')
              setUser(user)
              setChatPageRender(true)
              setIsLoggedIn(true)
              setIsOnUserProfile(false)
              setShowLogout(false)

          })
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });

  }

  return (
  <div className="login-container">
    <form className="login-form">
        <h2 className="login-heading">Login</h2>
        <input
        type="email"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="login-input"
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="login-input"
        />
        <button onClick={handleLogin} type="submit" className="login-button">
        Log in
        </button>
        <h4>Already have an account?</h4>
        <button onClick={() => setLoginOrSignup(false)} type="submit" className="signup-button">
          Signup
        </button>
        {errors && <p className="signup-error">{errors}</p>}
    </form>
</div>

  )
}

export default LoginForm
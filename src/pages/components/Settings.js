import React, {useState, useContext} from 'react'
import AppContext from './AppContext'
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import styles from './Settings.module.css'

function Settings() {
    const {user, 
          setUser, 
          setMatches, 
          setChatPageRender, 
          setIsLoaded,
          setShowLogout,
          setLogout,
          setIsLoggedIn, 
          setIsOnUserProfile
        } = useContext(AppContext)

    function handleLogout(e){
        e.preventDefault();        
        fetch("http://localhost:3000/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              console.log("good bye")
              setUser(null)
              setMatches(null)
              setChatPageRender(false)
              setIsLoaded(false)
              setIsOnUserProfile(false)
              setShowLogout(false)
            //   setLogout(true)
            }
          });
    }   

  return (
    <div className={styles.settings-container}>
        <button>
           
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
        </button>
    </div>
  )
}

export default Settings
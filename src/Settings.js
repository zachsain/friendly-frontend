import React, {useState, useContext} from 'react'
import AppContext from './AppContext'
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import './Settings.css'

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
        fetch("/logout", { method: "DELETE" }).then((r) => {
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

    function handleClick(e){
        console.log('btn click')
    }

  return (
    <div className="settings-container">
        <button>
           
            <IconButton onClick={handleLogout}>
            <LogoutIcon />
            </IconButton>
        </button>
    </div>
  )
}

export default Settings
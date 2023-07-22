import React, {useContext, useEffect, useState} from 'react';
import AppContext from './AppContext';
import Person2Icon from '@mui/icons-material/Person2';
import ForumIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IconButton, Badge } from '@mui/material';
import {Link, useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import "./Header.css"


function Header( ) {
  const history = useHistory()
  const {user, chatPageRender, isOnUserProfile, setIsOnUserProfile, setShowLogout} = useContext(AppContext) 
  const [unopenedMessagesCount, setUnopenedMessagesCount] = useState(0);
  const [unopenedMatchesCount, setUnopenedMatchesCount] = useState(0)
  let unreadMessages = 0

  useEffect(() => {
    if (user.messages){
      const unOpenedMessages = user.messages.filter((m) => m.receiver_id === user.id && m.receiver_read === null)
      console.log(unOpenedMessages)
      setUnopenedMessagesCount(unOpenedMessages.length)
    } 
    
    if (user.matches){
      const matchesFilter = user.matches.filter((m) => m.user1_id === user.id || m.user2_id === user.id)
      let matchCount = 0
      matchesFilter.forEach((m) => {
        if (m.user1_id === user.id && m.user1_opened === null){
          matchCount++
        } else if (m.user2_id === user.id && m.user2_opened === null){
          matchCount++
        }
      })

    setUnopenedMatchesCount(matchCount)
    } 
  }, [user.messages, user.matches, chatPageRender])

  console.log(unopenedMatchesCount)
  console.log(unopenedMessagesCount)

  unreadMessages = unopenedMatchesCount + unopenedMessagesCount

  return (
    <div className="header">
      {isOnUserProfile ? (
        <IconButton>
         <SettingsIcon onClick={() => setShowLogout(true)} className="header__icon" fontSize='large'/>
        </IconButton>
      ) : (
        <Link to="/userprofile">
          <IconButton> 
            <Person2Icon className="header__icon" fontSize="large"/>
          </IconButton>
        </Link>
      )}


        {/* <Link to="/userprofile">
          <IconButton> 
            <Person2Icon className="header__icon" fontSize="large"/>
          </IconButton>
        </Link> */}

        

        <Link to="/">
          <img 
              className="header__logo"
              src="https://i.imgur.com/8H6MxYS.png"
              // src="https://www.canva.com/design/DAFkhcTlSoU/UXZyJ7Cpy0cDVjYYAUf3_Q/view?utm_content=DAFkhcTlSoU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" 
              alt="tinder-logo"
              onClick={() => setIsOnUserProfile(false)}
          />     
        </Link>
        
        <Link to="/chat">
          <IconButton>
            <Badge
              badgeContent={unreadMessages}
              color="error"
              classes={{ badge: 'custom-badge' }}
            >
              <ForumIcon
                className="header__icon"
                fontSize="large"
                onClick={() => setIsOnUserProfile(false)}
              />
            </Badge>
          </IconButton>
        </Link>
    </div>
  )
}

export default Header
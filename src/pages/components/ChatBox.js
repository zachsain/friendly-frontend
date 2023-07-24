import React, {useContext, useState} from 'react'
import AppContext from './AppContext';
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './ChatBox.module.css'


function Chat({
                name, 
                message, 
                profilePic, 
                timestamp, 
                id, 
                matchId, 
                matchOpened, 
                messageId, 
                messageRead, 
                mostRecentMessage
              }) {

  const { chatPageRender, setChatPageRender, setIsLoaded } = useContext(AppContext)
  const [openedMsg, setOpenedMsg] = useState(false)

  let opened = false 
  
  if(matchOpened){
    opened = messageRead
  }

  // function handleProfileClick(e){
  //   console.log('click')
  // }

  const chatBoxClassName = opened ? "chat-read" : "chat-unread";

  function handleOpen(e) {

    setIsLoaded(true)
    setChatPageRender(!chatPageRender)
    console.log(chatBoxClassName)

     if (!matchOpened) {
      fetch(`http://localhost:3000/matches/${matchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        })
      }).then((r) => {
        if (r.ok) {
          r.json().then((m) => (console.log(m)))
        }
      })
        .catch((error) => {
          console.error("Error opening chat:", error);
      });
    } else if (!messageRead){
        fetch(`http://localhost:3000/messages/${messageId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match_id: matchId
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((m) => (console.log(m)))
          }
        })
          .catch((error) => {
            console.error("Error opening chat:", error);
        });
    } else {

      return null

    }
  }


  return (
    <Link to={`/chat/${id}`}>

    <div onClick={handleOpen} className={styles.chatBoxClassName}>
        <Avatar className={styles.chat__image} alt={name} src={profilePic} />
        <div className={styles.chat__details}>
            <h2>{name}</h2>
            {message ? (
             <p>{message}</p>
          ) : (
            <p id={styles.chat__noMessage} > Say Hello 👋  </p>
          )}
        </div>
        <p className={styles.chat__timestamp}> {timestamp} </p>
    </div>
    </Link>
  )
}


export default Chat
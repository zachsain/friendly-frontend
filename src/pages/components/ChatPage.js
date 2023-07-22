import React, { useState, useEffect, useContext } from 'react';
import "./ChatPage.css";
import AppContext from './AppContext';
import ChatBox from './ChatBox';

function ChatPage() {
  const { user, matches, chatPageRender, setChatPageRender} = useContext(AppContext);

  function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const difference = Math.floor((currentTime - messageTime) / 1000); 
  
    if (difference < 60) {  
      return 'Just now';
    } else if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(difference / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  }
  

    const sortedMatches = matches
      ? [...matches].sort((a, b) => {
          const aTimestamp = getMostRecentTimestamp(a, user.id);
          const bTimestamp = getMostRecentTimestamp(b, user.id);
          return bTimestamp - aTimestamp;
        })
      : [];

    function getMostRecentTimestamp(match, userId) {
      const messages = match.messages.filter(
        (message) => message.sender_id === userId || message.receiver_id === userId
      );
        if (messages.length > 0) {
          const mostRecentMessage = messages[messages.length - 1];
          return new Date(mostRecentMessage.created_at);
        } else if (match.matches.length > 0) {
          const currentUserMatch = match.matches.find(
            (m) => m.user1_id === userId || m.user2_id === userId
          );
          if (currentUserMatch) {
            return new Date(currentUserMatch.created_at);
          }
        } 
        return null;
      }

    const box = sortedMatches.map((p) => {
      let mostRecentMessage = null;
      if (p.matches && p.messages) {
        p.matches.forEach((match) => {
          const messages = p.messages.filter(
            (m) =>
              m.match_id === match.id &&
              (m.sender_id === user.id || m.receiver_id === user.id)
          );
          if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            if (!mostRecentMessage || latestMessage.created_at > mostRecentMessage.created_at) {
              mostRecentMessage = latestMessage;
            }
          }
        });
      } 

      let matchDate = null
      let formattedTime = null
      let matchOpened = false
      let userOpenedId = null
      let matchId;

      let messageRead = false

      console.log(mostRecentMessage)

      if(mostRecentMessage){
        if (mostRecentMessage.receiver_id === user.id){
          messageRead = mostRecentMessage.receiver_read;
        } else {
          messageRead = true;
        }
      }

      console.log(messageRead)

      if (p.matches && p.matches.length > 0) {
        const currentUserMatch = p.matches.find((match) => match.user1_id === user.id || match.user2_id === user.id);

      if (currentUserMatch) {
        if (currentUserMatch.user1_id === user.id) {
          matchOpened = currentUserMatch.user1_opened;
          userOpenedId = currentUserMatch.user1_id;
        } else if (currentUserMatch.user2_id === user.id) {
          matchOpened = currentUserMatch.user2_opened;
          userOpenedId = currentUserMatch.user2_id;
        }
        matchId = currentUserMatch.id
      }
      
      
      if (currentUserMatch) {
        matchDate = new Date(currentUserMatch.created_at);
        formattedTime = getTimeDifference(currentUserMatch.created_at);
      }
      }

    const timestamp = mostRecentMessage ? getTimeDifference(mostRecentMessage.created_at) : null;

    console.log(matches)
    
    return (
      <ChatBox
        key={p.id}
        userName={user.profile.first_name}
        setChatPageRender={setChatPageRender}
        name={p.profile.first_name}
        message={mostRecentMessage ? mostRecentMessage.content : null}
        timestamp={mostRecentMessage ? timestamp : formattedTime}
        profilePic={p.profile.featured_image.url}
        id={p.id}
        messageId={mostRecentMessage ? mostRecentMessage.id : null }
        matchOpened={matchOpened}
        messageRead={mostRecentMessage ? messageRead : true}
        matchId={matchId}
      />
    );
  });

  return <div className="chats">{box}</div>;
}

export default ChatPage;




import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import { Switch, Route } from "react-router-dom";
import Card from './Card';
import SwipeButtons from './SwipeButtons';
import ChatPage from './ChatPage';
import ChatScreen from './ChatScreen';
import UserProfile from './UserProfile';
import Login from './Login';
import AppContext from './AppContext';
import ProfilePage from './ProfilePage';
import {InfinitySpin} from 'react-loader-spinner';

function App() {
  const [user, setUser] = useState(null)
  const [matches, setMatches] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chatPageRender, setChatPageRender] = useState(false)
  const [logout, setLogout] = useState(false)
  const [render, setRender] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnUserProfile, setIsOnUserProfile] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => (
  //         setUser(user.user), 
  //         setMatches(user.matched_with), 
  //         console.log(user), 
  //         setIsLoaded(true),
  //         setIsLoggedIn(true)
  //         ));
  //     }
  //   });
  // } , [chatPageRender]);

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user.user);
            setMatches(user.matched_with);
            setIsLoaded(true);
            setIsLoggedIn(true); 
            setIsOnUserProfile(false);
          });
        } else {
          setIsLoaded(true); // Set isLoaded to true even if the request fails
        }
      })
      .catch((error) => {
        setIsLoaded(true); // Set isLoaded to true in case of any error
      });
  }, [chatPageRender]);


  console.log(user)
  console.log(matches)

  // if (!isLoaded) {
  //   return (
  //     <div className="loading-spinner">
  //      <InfinitySpin 
  //       width='200'
  //       color="#4fa94d"
  //     />
  //     </div>
  //   );
  // }

  if (!user) return (
    <div>
        <Login setShowLogout={setShowLogout} setIsOnUserProfile={setIsOnUserProfile} setIsLoggedIn={setIsLoggedIn} setChatPageRender={setChatPageRender} setUser={setUser} />
    </div>)

  
  return (
    <div className="App">
    <AppContext.Provider 
      value={{
        user, 
        setUser, 
        matches, 
        setMatches, 
        isLoaded, 
        setIsLoaded,
        chatPageRender,
        setChatPageRender, 
        isOnUserProfile, 
        setIsOnUserProfile,
        showLogout,
        setShowLogout
      }}>
    <Header /> 
      <Switch>
      <Route path = "/chat/:id">
          <ChatScreen />
        </Route>
        <Route path = "/chat">
          <ChatPage />
        </Route>
        <Route path = "/userprofile">
          <UserProfile />
        </Route>
        <Route path = "/profile/:id">
          <ProfilePage />
        </Route>
        <Route exact path="/">
            {user ? (
              <div>
                <Card />
              </div>
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>
      </Switch>
      </AppContext.Provider>
    </div>
  );
}


export default App;


import React, { useState, useEffect, useContext, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import AppContext from './AppContext';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwipeButtons from './SwipeButtons';
import { Link } from 'react-router-dom'
import styles from './Card.modules.css'
import {InfinitySpin, Rings} from 'react-loader-spinner';


function Card() {
  const [profiles, setProfiles] = useState([]);
  const [errors, setErrors] = useState("")
  const [swipeeId, setSwipeeId] = useState(0)
  const {user, setUser, matches, setMatches, setChatPageRender, chatPageRender} = useContext(AppContext);
  const tinderCardRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const [isEndOfProfiles, setIsEndOfProfiles] = useState(false);
  const [numberOfSwipes, setNumberOfSwipes] = useState(0)


  useEffect(() => {
    fetch('/profiles')
      .then((r) => r.json())
      .then((p) => (setProfiles(p), setNumberOfSwipes(p.length)));
      
  }, []);


  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const diffInMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  
  function handleSwipeRight(id) {
    console.log('right');
    tinderCardRef.current.swipe('right');
    let amount = numberOfSwipes - 1
    setNumberOfSwipes(amount)
    fetch("/swipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swipee_id: id,
        swiper_id: user.id,
        direction: "right",
      
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((obj) =>{
          console.log(obj)
          if (obj.match) {
            let previous = matches 
            let updatedMatches = [...previous, obj.user]
            setMatches(updatedMatches)
            setChatPageRender(!chatPageRender)
          }
        })   
      } else {
        r.json().then((err) => (console.log(err), setErrors(err.errors)));
      }
    });

  }

  function handleSwipeLeft(id) {
    console.log('left');
    tinderCardRef.current.swipe('left');
    let amount = numberOfSwipes - 1
    setNumberOfSwipes(amount)
    fetch("/swipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swipee_id: id,
        swiper_id: user.id,
        direction: "left"
      
      }),
    }).catch((err) => {
      setErrors(err.errors);
    });
  }

  function handleCardLeftScreen(id) {
    setSwipeeId(id)
    setProfiles((prevProfiles) => prevProfiles.filter((p) => p.user_id !== id));
    console.log(id)

  }
 
  return (
    <div className={styles.tinderCards__cardContainer}> 
      {profiles.map((p) => (
        <TinderCard
          className={styles.swipe}
          key={p.id}
          preventSwipe={['up', 'down']}
          ref={tinderCardRef}
          onCardLeftScreen={() => handleCardLeftScreen(p.user_id)}
        >
          <div className={styles.tinder__cards}>
          <Link to={`/profile/${p.id}`}>
            <div className={styles.tinder__card}>
              <div className={styles.displayCard}>
                <div className={styles.displayCard__image-container}>
                  <img 
                    className={styles.tinder__card_img}
                    src={p.featured_image.url} 
                    alt="profile-photo" 
                  />
                  <h1 className={styles.dislpayCard__h1}>
                    {p.first_name} 
                  </h1>
                </div>
              </div>
            </div>
            </Link>
          </div>
        
          <div className={styles.swipeButtons-conatiner}>
            <SwipeButtons
              onSwipeLeft={() => handleSwipeLeft(p.user_id)}
              onSwipeRight={() => handleSwipeRight(p.user_id)}
            />
          </div>

        </TinderCard>
        
      ))}   

      {numberOfSwipes === 0 && (
        <div className={styles.tinder__cards}>
          <div className={styles.tinder__card}>
            <div className={styles.loading-spinner-container}>
              <div className={styles.loading-spinner}>
              <h3 className={styles.loading-spinner-h1}>Thanks for joining Friendly</h3>
                <div>
                  <Rings
                    height="300"
                    width="250"
                    color="#0071BC"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                    speed={.05}
                  />
                </div>
                <h2 className={styles.loading-spinner-h1}>we're looking for more people...</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

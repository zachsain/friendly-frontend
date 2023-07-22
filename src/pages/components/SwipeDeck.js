import React, { useState, useEffect, useRef } from 'react';
import AppContext from './AppContext';
import DisplayCard from './DisplayCard';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TinderCard from 'react-tinder-card'
import './DisplayCard.css';
import './SwipeDeck.css';
import './SwipeButtons.css';

function SwipeDeck() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeContainerRef = useRef(null);

  useEffect(() => {
    fetch('/profiles')
      .then((r) => r.json())
      .then((p) => setProfiles(p));
  }, []);

  function handleSwipeRight() {
    console.log('Swiped Right');
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  function handleSwipeLeft() {
    console.log('Disliked');
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <div className="tinder">
      <div ref={swipeContainerRef}>
        {profiles.map((p, index) => (
            <DisplayCard
              name={p.first_name}
              dob={p.dob}
              image={p.featured_image.url}
            />
        ))}
      </div>

      <div className="tinder--buttons">
        <div className="swipeButtons">
          <button
            id="nope"
            className="swipeButtons__left"
            onClick={handleSwipeLeft}
          >
            <CloseIcon fontSize="large" />
          </button>

          <button
            id="love"
            className="swipeButtons__right"
            onClick={handleSwipeRight}
          >
            <FavoriteIcon fontSize="large" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwipeDeck;

import React from 'react'
import './SwipeButtons.css'
import './Card.css'
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { IconButton }  from '@mui/material';

function SwipeButtons({ onSwipeLeft, onSwipeRight }) {
  return (
    <div className="swipeButtons">
      <button id="nope" className="swipeButtons__left" onClick={onSwipeLeft}>
        <CloseIcon style={{ fontSize: 45 }} />
      </button>
      <button id="love" className="swipeButtons__right" onClick={onSwipeRight}>
        <FavoriteIcon style={{ fontSize: 45 }} />
      </button>
    </div>
  );
}

export default SwipeButtons
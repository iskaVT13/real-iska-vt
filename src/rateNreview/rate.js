
import React, { useState } from 'react';
import './rate.css';
import avatar from '../pictures/avatar.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingAndReview = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
    setHasRated(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setHasRated(true);
    } else {
      console.log('Rating:', rating);
      console.log('Comment:', comment);
      onClose();
    }
  };
  
  return (
    <div className="rate-popup">
      <div className="rate-content">
        <div className="gif-container">
          <img src={avatar} alt="GIF"/>
        </div>
        <div className="rate-container">
          <h2 className="rate-title">Rate your experience</h2>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((value) => (
                <FontAwesomeIcon
                key={value}
                icon={faStar}
                onClick={() => handleRatingChange(value)}
                className={value <= rating ? 'star selected' : 'star'}
                />
            ))}
          </div>
          {hasRated && rating === 0 && <p className="rate-message">You haven't rated us yet.</p>}
          <textarea
            className="comment-textarea"
            placeholder={isTyping ? '' : 'Leave a message'}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onChange={handleCommentChange}
            value={comment}
          />
          <div className="buttons">
            <button onClick={handleSubmit} className="submit-button">Rate</button>
            <button onClick={onClose} className="maybe-later-button">Maybe Later</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;

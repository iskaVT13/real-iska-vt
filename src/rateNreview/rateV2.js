import React, { useState, useEffect } from 'react';
import './rate.css';
import avatar from '../pictures/avatar.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RateV2 = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [nameError, setNameError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the default behavior of the event
      event.preventDefault();
      
      // Perform any custom reload logic here
      // For example, you might fetch updated data or refresh certain components
      fetchData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Function to fetch updated data or perform any other necessary actions
  const fetchData = async () => {
    try {
      // Fetch updated data here
      // const updatedData = await fetchUpdatedData();
      
      // Update state or perform other necessary actions
      // setData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setHasRated(false);
    setRatingError('');
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleUserTypeChange = (selectedUserType) => {
    setUserType(selectedUserType);
    setUserTypeError('');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(event.target.value.trim() === '' ? 'Please enter your name' : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (name.trim() === '') {
      setNameError('Please enter your name');
      hasError = true;
    } else {
      setNameError('');
    }

    // Check if rating is not selected
    if (rating === 0) {
      setHasRated(true);
      setRatingError('Please rate your experience');
      hasError = true;
    } else {
      setRatingError('');
    }

    if (!userType) {
      setUserTypeError('Please select user type');
      hasError = true;
    } else {
      setUserTypeError('');
    }

    if (!hasError) {
      const currentDate = new Date(); // Get the current date
      const formattedDate = currentDate.toLocaleString(); 
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          message: comment,
          rating: rating,
          userType: userType,
          date: formattedDate
        })
      };

      const res = await fetch(
        'https://iskavt-26f75-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json',
        options
      );

      if (res.ok) {
        onClose(); // Close the rate popup
        clearForm(); // Clear the form
      } else {
        alert('Error Sending Feedback');
      }
    }
  };

  const clearForm = () => {
    setName('');
    setComment('');
    setRating(0);
    setUserType(null);
    setNameError('');
    setRatingError('');
    setUserTypeError('');
  };
  
  return (
    <div className='overlay-container'>
      <div className="rate-popup">
        <div className="rate-content">
          <div className="gif-container">
            <img src={avatar} alt="GIF" className="gif" />
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
            {hasRated && rating === 0 && <p className="rate-message">{ratingError}</p>}
            <div className='radio-btn'>
              <label>
                <input
                  type='radio'
                  name='userType'
                  value='student'
                  checked={userType === 'Student'}
                  onChange={() => handleUserTypeChange('Student')}
                />
                Student
              </label>
              <label>
                <input
                  type='radio'
                  name='userType'
                  value='visitor'
                  checked={userType === 'Visitor'}
                  onChange={() => handleUserTypeChange('Visitor')}
                />
                Visitor
              </label>
              {userTypeError && <p className="error-message">{userTypeError}</p>}
            </div>
            <div className='name-input'>
              <input
                type='text'
                name='Name'
                placeholder='Please enter your name'
                value={name}
                autoComplete='off'
                required
                onChange={handleNameChange}
              />
              {nameError && <p className="error-message">{nameError}</p>}
            </div>
            <textarea
              className="comment-textarea"
              placeholder={isTyping ? '' : 'Leave a message'}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              onChange={handleCommentChange}
              value={comment}
            />
            <div className="buttonss">
              <button onClick={handleSubmit} className="submit-button">Rate</button>
              <button onClick={onClose} className="maybe-later-button">Maybe Later</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateV2;

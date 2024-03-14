// DisplayData.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './review.css';

const DisplayData = ({onClose}) => {
  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://iskavt-26f75-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json');
      const result = await response.json();
      const dataArray = Object.values(result);
      
      dataArray.sort((a, b) => {
        return dataArray.indexOf(b) - dataArray.indexOf(a);
      });

      setReviews(dataArray);
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const ratingColors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00'];

  const overallRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const getColorForRating = (rating) => {
    if (rating <= 1) {
        return ratingColors[0];
    } else if (rating <= 2) {
        return ratingColors[1]; 
    } else if (rating <= 3) {
        return ratingColors[2]; 
    } else if (rating <= 4) {
        return ratingColors[3]; 
    } else {
        return ratingColors[4];
    }
  };

  const circleStyle = {
    borderColor: getColorForRating(overallRating),
    '--glow-color': getColorForRating(overallRating),
  };

  const percentageColors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00'];

  const getColorForPercentage = (percentage) => {
      if (percentage <= 20) {
          return percentageColors[0];
      } else if (percentage <= 40) {
          return percentageColors[1]; 
      } else if (percentage <= 60) {
          return percentageColors[2]; 
      } else if (percentage <= 80) {
          return percentageColors[3]; 
      } else {
          return percentageColors[4]; 
      }
  };

  const ratingCounts = {};
  reviews.forEach((review) => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
  });

  const getFilteredReviewCount = () => {
    if (filter === 'all') {
      return reviews.length;
    } else {
      return reviews.filter(review => review.rating.toString() === filter).length;
    }
  };

  const stringToColor = (str, index) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash += index;
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  };

  const handleGoBack = () => {
    onClose();
  };

  const generateCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  };
  
  return (
    <div className="review-container">
      <div className="review-header">
        <div className="backbut" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="review-text"> 
          <h2 className="header-text">Reviews</h2>
        </div>
      </div>
      <div className="overall-rating">
        <div className="circle-review">
          <div className="circle" style={circleStyle}>{overallRating.toFixed(1)}</div>
          <div className="total-reviews">{reviews.length} reviews</div>
        </div>
        <div className="ratings">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="rating" onClick={() => setFilter(rating)}>
              <div className="starate">
                <span className="rating-number">{rating}</span>
                <FontAwesomeIcon icon={faStar} className="star-icon" />
              </div>
              <div className="percentage-line-container">
                <div
                  className="percentage-line"
                  style={{ 
                    width: `${((ratingCounts[rating] || 0) / reviews.length * 100).toFixed(1)}%`,
                    backgroundColor: getColorForPercentage(((ratingCounts[rating] || 0) / reviews.length * 100).toFixed(1))
                  }}
                ></div>
              </div>
              <span className="percentage">
                {((ratingCounts[rating] || 0) / reviews.length * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="filter">
        <div className="reviews-count">
          {getFilteredReviewCount()} reviews
        </div>
        <div className="filter-sort">
          <div className="filter-icon">
            <FontAwesomeIcon icon={faFilter} />
          </div>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All Stars</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
      <div className="reviews">
        {reviews
          .filter((review) => filter === 'all' || review.rating === parseInt(filter))
          .map((review, index) => (
            <div key={index} className="review">
              <div className="user-info">
                <div className="avatar-name">
                <div className="user-avatar" style={{ backgroundColor: stringToColor(review.Name, index) }}>{review.Name.charAt(0)}</div>
                  <span className="name">{review.Name}</span>
                  <span className="type">• {review.userType}</span>
                </div>
                <div className="user-details">
                  <div className="stars">
                    {Array(review.rating).fill().map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="staricon2" />
                    ))}
                  </div>
                  <span className="date">{review.date || generateCurrentDate()}</span>
                </div>
              </div>
              <p className="comment">{review.message}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayData;

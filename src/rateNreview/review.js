
import React, { useState } from 'react';
import './review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faFilter } from '@fortawesome/free-solid-svg-icons';

const Review = ({onClose}) => {
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  // Sample data for reviews (replace with actual data)
  const reviews = [
    { name: 'John Doe', rating: 5, comment: 'Great experience! A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long.' },
    { name: 'Jane Smith', rating: 4, comment: 'Good service.' },
    { name: 'Alice Johnson', rating: 3, comment: 'Could be better.' },
    { name: 'Bob Brown', rating: 1, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 5, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 5, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 5, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 2, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 2, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 5, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 1, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 5, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 5, comment: 'Highly recommended.' },
    { name: 'Bob Brown', rating: 1, comment: 'Highly recommended.' },
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Define an array of colors corresponding to different rating ranges
  const ratingColors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00'];

  // Calculate overall rating
  const overallRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const getColorForRating = (rating) => {
    if (rating <= 1) {
        return ratingColors[0]; // Red for low ratings
    } else if (rating <= 2) {
        return ratingColors[1]; // Orange for slightly better ratings
    } else if (rating <= 3) {
        return ratingColors[2]; // Yellow for average ratings
    } else if (rating <= 4) {
        return ratingColors[3]; // Light green for good ratings
    } else {
        return ratingColors[4]; // Green for excellent ratings
    }
  };

  const circleStyle = {
    borderColor: getColorForRating(overallRating),
    '--glow-color': getColorForRating(overallRating), // Set glow color dynamically
  };

  const percentageColors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00'];

// Function to get color based on percentage
  const getColorForPercentage = (percentage) => {
      if (percentage <= 20) {
          return percentageColors[0]; // Red for low percentages
      } else if (percentage <= 40) {
          return percentageColors[1]; // Orange for slightly higher percentages
      } else if (percentage <= 60) {
          return percentageColors[2]; // Yellow for average percentages
      } else if (percentage <= 80) {
          return percentageColors[3]; // Light green for good percentages
      } else {
          return percentageColors[4]; // Green for excellent percentages
      }
  };

  // Calculate percentage of reviews for each rating
  const ratingCounts = {};
  reviews.forEach((review) => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
  });

  // Function to calculate the number of reviews based on the filter
  const getFilteredReviewCount = () => {
    if (filter === 'all') {
      return reviews.length;
    } else {
      return reviews.filter(review => review.rating.toString() === filter).length;
    }
  };

  // Function to generate a hexadecimal color code from a string
  const stringToColor = (str, index) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Add the index to the hash to ensure uniqueness
    hash += index;
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  };

  const handleGoBack = () => {
    onClose();
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
                  <div className="user-avatar" style={{ backgroundColor: stringToColor(review.name, index) }}>{review.name.charAt(0)}</div>
                  <span className="name">{review.name}</span>
                </div>
                <div className="user-details">
                  <div className="stars">
                    {Array(review.rating).fill().map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="staricon2" />
                    ))}
                  </div>
                  <span className="date">{review.date}</span>
                </div>
              </div>
              <p className="comment">{review.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Review;

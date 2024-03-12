// DisplayData.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './reviewV2.css';

const DisplayData = ({ onClose }) => {
  const [data, setData] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://iskavt-26f75-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json'
      );
      const result = await response.json();
      const dataArray = Object.values(result);
      setData(dataArray);
      setTotalReviews(dataArray.length);
      setFilteredData(dataArray);
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const filterByAllReviews = () => {
    setSelectedRating('');
    setFilteredData(data);
  };

  const filterByRating = (rating) => {
    setSelectedRating(rating);
    if (rating === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.rating === parseInt(rating));
      setFilteredData(filtered);
    }
  };

  const countReviewsByRating = (rating) => {
    return data.filter((item) => item.rating === rating).length;
  };

  const calculateAverageRating = () => {
    if (data.length === 0) return 0;

    const totalRating = data.reduce((acc, item) => acc + item.rating, 0);
    return totalRating / data.length;
  };

  const averageRating = calculateAverageRating();

  const getStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{
            color: i <= rating ? 'gold' : 'black',
            opacity: i > rating ? '0.3' : '1',
          }}
        />
      );
    }
    return stars;
  };

  const renderRatingBar = () => {
    const stars = getStarIcons(averageRating);
    return (
      <div className="rating-bar">
        <div className="average-rating">{averageRating.toFixed(1)}</div>
        <div className="star-icons">{stars}</div>
      </div>
    );
  };

  const renderRatingBars = () => {
    return [5, 4, 3, 2, 1].map((rating) => {
      const count = countReviewsByRating(rating);
      const color = getRatingColor(rating);

      return (
        <div key={rating} className="line-bar">
                        {rating}
          <div className="line-label">
          </div>
          <div className='line-container'>
          <div className="line" style={{ width: `${count}%`, backgroundColor: color }} />
          </div>
        </div>
      );
    });
  };

  const getRatingColor = (rating) => {
    const ratingColors = {
      5: 'gold',
      4: 'gold',
      3: 'gold',
      2: 'gold',
      1: 'gold',
    };

    return ratingColors[rating] || 'black';
  };

  const handleGoBack = () => {
    onClose();
  };

  return (
    <div className="r-container">
      <div className="backbut" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className='title-review'>
        <h2>Rate and Review</h2>
      </div>
      <div className="reviews-total">
        <h3>{totalReviews} <br></br>Reviews</h3>
      </div>
      <div className="review-stats">{renderRatingBar()}</div>
      <div className="rating-bars">{renderRatingBars()}</div>

      <div className="dropdown">
        <button className="filter-button" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faFilter} /> Filter
        </button>
        {isDropdownVisible && (
          <div className="dropdown-content">
            <button onClick={filterByAllReviews} className={selectedRating === '' ? 'active' : ''}>
              All Reviews ({totalReviews})
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => filterByRating(rating)}
                className={selectedRating === rating ? 'active' : ''}
              >
                {rating} star ({countReviewsByRating(rating)})
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="list-review">
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>
              <strong>Name:</strong> {item.Name}
              <br></br>
              {getStarIcons(item.rating)}{' '}
              <br></br>
              <strong>Type:</strong> {item.userType}
              <br></br>
              <strong>Message:</strong> {item.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayData;

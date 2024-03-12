// DisplayData.js

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './reviewV2.css';

const DisplayData = ({onClose}) => {

    const [data, setData] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState('');

    const handleGoBack = () => {
        onClose();
      };

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

    const getStarIcons = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    style={{
                        color: i <= rating ? 'gold' : 'black', // Give gold color for filled stars
                        opacity: i > rating ? '0.3' : '1' // Reduce opacity for unfilled stars
                    }}
                />
            );
        }
        return stars;
    };

    return (
        <div className='r-container'>
            <div className="backbut" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>
            <h2>{totalReviews} Reviews</h2>
            <div className="dropdown">
                <button className="filter-button" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faFilter} /> Filter
                </button>
                {isDropdownVisible && (
                    <div className="dropdown-content">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => filterByRating(rating)}
                                className={selectedRating === rating ? 'active' : ''}
                            >
                                {(rating)} ({countReviewsByRating(rating)})
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className='list-review'>
            <ul>
                {filteredData.map((item, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {item.Name}<br></br>
                        {getStarIcons(item.rating)}{' '}<br></br>
                        <strong>Type:</strong> {item.userType}<br></br>
                        <strong>Message:</strong> {item.message}
                    </li>
                    
                ))}
            </ul>
            </div>
        </div>
    );
};

export default DisplayData;

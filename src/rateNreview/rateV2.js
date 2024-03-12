import React, { useState } from 'react';
import './rateV2.css';

const RateV2 = () => {
    const [user, setUser] = useState({
        Name: '',
        message: '',
        rating: 1, // Set the default rating value to 1
        userType: '' // Set the default user type to 'student'
    });

    const clearForm = () => {
        setUser({ Name: '', message: '', rating: 1, userType: 'student' });
    };

    const data = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    };

    const handleRatingChange = (rating) => {
        setUser({ ...user, rating });
    };

    const handleUserTypeChange = (userType) => {
        setUser({ ...user, userType });
    };

    const getData = async (e) => {
        e.preventDefault();
        const { Name, message, rating, userType } = user;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                message,
                rating,
                userType
            })
        };

        const res = await fetch(
            'https://iskavt-26f75-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json',
            options
        );

        if (res.ok) {
            alert('Feedback Sent!');
            clearForm();
        } else {
            alert('Error Sending Feedback');
        }
    };

    return (
        <div className='form'>
            <div className='form-container'>
                <form method='POST'>
                    {/* Display star rating with values 1 to 5 */}
                    <div>
                        <span>Rating:</span><br></br>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                style={{
                                    cursor: 'pointer',
                                    color: star <= user.rating ? 'gold' : 'gray',
                                    fontSize: '50px'
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <div className='radio-btn'>
                        <span>User Type:</span><br></br>
                        <label>
                            <input 
                                type='radio' 
                                name='userType' 
                                value='student' 
                                checked={user.userType === 'student'} 
                                onChange={() => handleUserTypeChange('student')} 
                            />
                            Student
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='userType' 
                                value='visitor' 
                                checked={user.userType === 'visitor'} 
                                onChange={() => handleUserTypeChange('visitor')} 
                            />
                            Visitor
                        </label>
                    </div>
                    <input 
                        className='name-input'
                        type='text'
                        name='Name'
                        placeholder='Your name'
                        value={user.Name}
                        autoComplete='off'
                        required
                        onChange={data}
                    />
                    
                    <textarea
                        type='text'
                        name='message'
                        placeholder='Your comment'
                        value={user.message}
                        autoComplete='off'
                        required
                        onChange={data}
                    />
                    <br></br>
                    <button className='submit-btn' onClick={getData}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RateV2;

import React from 'react';
import './App.css'

const ErrorComponent = ({ errorMessage, onTryAgain }) => {
  return (
    <div className='error-content'>
      <p style={{ color: 'red' }}>{errorMessage}</p><br></br>
      <button style={{background: 'red'}}onClick={onTryAgain}>Try Again</button>
    </div>
  );
};

export default ErrorComponent;

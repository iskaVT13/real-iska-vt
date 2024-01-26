import React from 'react';
import './App.css'

const ErrorComponent = ({ errorMessage, onTryAgain }) => {
  return (
    <div className='error-content'>
      <p>{errorMessage}</p><br></br>
      <button onClick={onTryAgain}>Try Again</button>
    </div>
  );
};

export default ErrorComponent;

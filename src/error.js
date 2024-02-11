import React from 'react';
import './App.css';

import ErrorImg from './pictures/iska-error.ico';

const ErrorComponent = ({ errorMessage, onTryAgain }) => {
  return (
    <div className='error-content'>
      <img src={ErrorImg} alt='erro-img' />
      <p>{errorMessage}</p><br></br>
      <button onClick={onTryAgain}>Try Again</button>
    </div>
  );
};

export default ErrorComponent;

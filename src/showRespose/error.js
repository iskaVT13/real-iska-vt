import React from 'react';

const ErrorComponent = ({ errorMessage, onTryAgain }) => {
  return (
    <div>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <button onClick={onTryAgain}>Try Again</button>
    </div>
  );
};

export default ErrorComponent;

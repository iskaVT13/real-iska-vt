// SubComponent.js

import React from 'react';

const SubComponent = ({ onBack }) => {
  return (
    <div>
      <p>This is the Biology Coordinator</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default SubComponent;

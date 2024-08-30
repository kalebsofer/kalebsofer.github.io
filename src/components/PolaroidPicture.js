import React, { useState } from 'react';
// import './src/scss/polaroid-picture.scss'; 

const PolaroidPicture = ({ imageSrc, altText, description }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`polaroid ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="polaroid-inner">
        <div className="polaroid-front">
          <img src={imageSrc} alt={altText} />
          <p>👆</p>
        </div>
        <div className="polaroid-back">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PolaroidPicture;

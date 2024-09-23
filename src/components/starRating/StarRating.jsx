import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
    }

    return (
        <div >
            {stars.map((star, index) => (
                <span className='starIcon' key={index}>{star}</span>
            ))}
        </div>
    );
};

export default StarRating;

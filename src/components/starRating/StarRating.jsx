import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Star } from './styles';

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
        <div className='starRatingContainer'>
            {stars.map((star, index) => (
                <Star style={{color: '#d4af37'}} key={index}>{star}</Star>
            ))}
        </div>
    );
};

export default StarRating;

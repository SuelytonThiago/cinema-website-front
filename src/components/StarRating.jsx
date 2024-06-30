import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa';


const StarRating = ({rating}) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
  
    const renderStars = () => {
      let stars = [];
      for (let i = 0; i < maxStars; i++) {
        if (i < fullStars) {
          stars.push(<FaStar key={i} />);
        } else if (i === fullStars && hasHalfStar) {
          stars.push(<FaStar half key={i} />);
        } else {
          stars.push(<FaRegStar key={i} />);
        }
      }
      return stars;
    };

    return (
        <div>
          {renderStars()}
        </div>
      );
}

export default StarRating
import React from 'react'
import StarRating from '../starRating/StarRating'
import './CommentTemplate.css'

const CommentTemplate = ({review}) => {
    return (
        <div>
            <div key={review.id} className="review">
                <img className='userIcon' src={review.profileImgUser} alt={review.userName} />
                <div className='reviewInfo'>
                    <div className='reviewUserInfo'>
                        <h4>{review.userName}</h4>
                        <StarRating rating={review.rating} />
                    </div>
                    <div className='commentInfo'>
                        <p>{review.comment}</p>
                        <p className='date'>{review.date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentTemplate
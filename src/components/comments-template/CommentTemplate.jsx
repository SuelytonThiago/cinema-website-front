import React from 'react'
import StarRating from '../starRating/StarRating'
import { Review, ReviewUserInfo, Username } from './CommentTemplate'

const CommentTemplate = ({review}) => {
    return (
        <div>
            <Review key={review.id}>
                <img className='userIcon' src={review.profileImgUser} alt={review.userName} />
                <div className='reviewInfo'>
                    <ReviewUserInfo>
                        <Username>{review.userName}</Username>
                        <StarRating rating={review.rating} />
                    </ReviewUserInfo>
                    <div >
                        <p style={{fontSize: '15px'}}>{review.comment}</p>
                        <p style={{fontSize: '12px'}}>{review.date}</p>
                    </div>
                </div>
            </Review>
        </div>
    )
}

export default CommentTemplate
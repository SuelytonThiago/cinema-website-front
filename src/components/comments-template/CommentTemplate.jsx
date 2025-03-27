import React from 'react'
import StarRating from '../starRating/StarRating'
import { CommentContainer, Review, ReviewUserInfo, Username } from './styles.js'
import { UserImg } from '../rate-movie/styles.js'
import { ReviewInfo } from './styles.js'

const CommentTemplate = ({review}) => {
    return (
        <div>
            <Review key={review.id}>
                <UserImg src={review.profileImgUser} alt={review.userName} />
                <ReviewInfo>
                    <ReviewUserInfo>
                        <Username>{review.userName}</Username>
                        <StarRating rating={review.rating} />
                    </ReviewUserInfo>
                    <CommentContainer>
                        <p style={{fontSize: '15px'}}>{review.comment}</p>
                        <p style={{fontSize: '12px'}}>{review.date}</p>
                    </CommentContainer>
                </ReviewInfo>
            </Review>
        </div>
    )
}

export default CommentTemplate
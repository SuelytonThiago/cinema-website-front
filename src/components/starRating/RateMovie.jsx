import React, { useState } from 'react';
import { FaStar, FaRegStar, FaUser, FaPen, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useReviewMutation } from '../../hooks/UseReviewMutate';
import { showLoginModal } from '../../redux/show-login-modal/actions';
import { useReviewUserData } from '../../hooks/UseReviewUserData';
import StarRating from './StarRating';
import { UseReviewEditMutation } from '../../hooks/UseReviewEditMutation';
import './RateMovie.css';

const RateMovie = ({ id }) => {
  const { currentUser } = useSelector(state => state.userReducer);
  const { data: reviewUser } = useReviewUserData(currentUser?.id, id);
  const mutationAddReview = useReviewMutation();
  const mutationEditReview = UseReviewEditMutation();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(reviewUser?.rating || null);
  const [comment, setComment] = useState(reviewUser?.comment || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleRatingChange = (index) => setRating(index);

  const handleAddRating = (e) => {
    e.preventDefault();
    if (currentUser) {
      if (reviewUser) {
        mutationEditReview.mutate({ comment, rating, id: reviewUser.id });
        setIsEditing(false);
      } else {
        
        mutationAddReview.mutate({ comment, rating, id });
      }
    } else {
      dispatch(showLoginModal());
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing); 
  };


  return (
    <div className='userAvaliationContainer'>
      <div className='userAvaliationControl'>
        <div>
          {currentUser ? (
            <img className='userImgIcon' src={currentUser.profileImg} alt={currentUser.name} />
          ) : (
            <FaUser className='userImgIcon' />
          )}
        </div>

        <div className='userAvaliationForm'>
          {reviewUser && !isEditing ? (
            <>
              <p className='userNameConntnainer'>{currentUser.name}</p>
              <StarRating rating={reviewUser.rating} />
              <p>{reviewUser.comment}</p>
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5].map(index => (
                <button
                  key={index}
                  onClick={() => handleRatingChange(index)}
                  className='ratingButton'>
                  {rating >= index ? <FaStar className='starIcon' /> : <FaRegStar className='starIcon' />}
                </button>
              ))}
              <form className='commentUserForm' onSubmit={handleAddRating}>
                <input
                  type="text"
                  value={comment} 
                  placeholder='adicione sua avaliação sobre o filme'
                  onChange={(e) => setComment(e.target.value)}
                />
                <input type="submit" value={reviewUser ? 'Salvar' : 'Enviar'} />
              </form>
            </>
          )}
        </div>
      </div>
      {reviewUser && (
        <button className='editBtn' onClick={toggleEdit}>
          {isEditing ? <FaTimes /> : <FaPen />}
        </button>
      )}
    </div>
  );
};

export default RateMovie;

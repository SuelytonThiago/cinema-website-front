import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaUser, FaPen, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../redux/show-login-modal/actions';
import StarRating from './StarRating';
import './RateMovie.css';

import backend from '../../../api/index.ts'
import Cookies from 'js-cookie'
import { InputSubit } from '../Input.jsx';
import InputText from '../input-form/InputText.jsx';

const RateMovie = ({ id }) => {
  const { currentUser } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState(null)
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  async function handleGetUserReview() {
    try {
      const response = await backend.reviewsAPI.getUserReview(currentUser.id, id, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });

      if (response.data) {
        setCurrentReview(response.data);
        setRating(response.data.rating);
        setComment(response.data.comment);
      }

    } catch (err) {
      
    }
  }

  useEffect(() => {
      handleGetUserReview();
    
  }, [currentUser, id]);
  

  const handleAddRating = async (e) => {
    e.preventDefault();
    if (currentUser) {

      const formData = {
        comment: comment,
        rating: rating,
        movieId: id,
      }

      try {
        if (currentReview) {
          await backend.reviewsAPI.updateReview(currentReview.id, formData, {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
          })
          setCurrentReview({
            ...currentReview,
            comment: comment,
            rating: rating,
          });

        } else {
          await backend.reviewsAPI.addReviewToFilm(formData, {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
          })
          setCurrentReview({
            ...currentReview,
            comment: comment,
            rating: rating,
          });
          handleGetUserReview();
        }
        
        setIsEditing(false);
      } catch (err) {
        console.log(err)
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
          {currentReview && !isEditing ? (
            <>
              <p className='userNameConntnainer'>{currentUser.name}</p>
              <StarRating rating={currentReview.rating} />
              <p>{currentReview.comment}</p>
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5].map(index => (
                <button
                  key={index}
                  onClick={() => setRating(index)}
                  className='ratingButton'>
                  {rating >= index ? <FaStar className='starIcon' /> : <FaRegStar className='starIcon' />}
                </button>
              ))}
              <form className='commentUserForm' onSubmit={handleAddRating}>
                <InputText error={''}
                  handleChange={(e) => setComment(e.target.value)}
                  nameInput={'comment'}
                  placeholder={'adicione sua avaliação sobre o filme'}
                  value={comment} />
                <InputSubit type="submit" value={currentUser ? 'Salvar' : 'Publicar'} />
              </form>
            </>
          )}
        </div>
      </div>
      {currentReview && (
        <button className='editBtn' onClick={toggleEdit}>
          {isEditing ? <FaTimes /> : <FaPen />}
        </button>
      )}
    </div>
  );
};

export default RateMovie;

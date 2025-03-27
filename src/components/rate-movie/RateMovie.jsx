import React, { useEffect, useState } from 'react';
import { FaPen, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from '../../redux/show-login-modal/actions';
import StarRating from './../starRating/StarRating.jsx';
import backend from '../../../api/index.ts'
import Cookies from 'js-cookie'
import InputText from '../input-form/InputText.jsx';
import {
  CommentUserForm,
  EditBtn,
  FormContainer,
  HalfStar,
  Input,
  RatingButton,
  Star,
  UserAvaliationContainer,
  UserAvaliationControl,
  UserIcon,
  UserImg,
  UserNameContainer
} from './styles.js'
import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';
import { Button } from '../Button.js';

const RateMovie = ({ id }) => {
  const { currentUser } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const { t } = useTranslation();

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

    } catch (err) { }
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
        toast.error(err?.response?.data?.Message);
      }
    } else {
      dispatch(showLoginModal());
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };


  return (
    <UserAvaliationContainer>
      <UserAvaliationControl>
        <div>
          {currentUser ? (
            <UserImg src={currentUser.profileImg} alt={currentUser.name} />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          {currentReview && !isEditing ? (
            <>
              <UserNameContainer>{currentUser.name}</UserNameContainer>
              <StarRating rating={currentReview.rating} />
              <p>{currentReview.comment}</p>
            </>
          ) : (
            <div>
              <div>
                {[1, 2, 3, 4, 5].map(index => (
                  <RatingButton
                    key={index}
                    onClick={() => setRating(index)}>
                    {rating >= index ? <Star /> : <HalfStar />}
                  </RatingButton>
                ))}
              </div>
              <FormContainer>
                <Input
                  error={''}
                  onChange={(e) => setComment(e.target.value)}
                  name={'comment'}
                  placeholder={t('placeholder-adicionar-avaliacao')}
                  value={comment} />

                <Button onClick={handleAddRating}>
                  {isEditing ? t('botao-salvar') : t('botao-publicar')}
                </Button>
              </FormContainer>

            </div>
          )}
        </div>
      </UserAvaliationControl>
      {currentReview && (
        <EditBtn onClick={toggleEdit}>
          {isEditing ? <FaTimes /> : <FaPen />}
        </EditBtn>
      )}
    </UserAvaliationContainer>
  );
};

export default RateMovie;

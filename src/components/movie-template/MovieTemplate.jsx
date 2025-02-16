import React from 'react'
import StarRating from './../starRating/StarRating'
import { MovieContainer, MovieImg, MovieInfoContainer } from './styles'
import { TitleH2 } from '../Title.js'
import { LinkBtn } from '../Link.js'
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';


const MovieTemplate = ({ item }) => {

  const { t } = useTranslation();

  return (
    <div>
      <MovieContainer>
        <MovieInfoContainer>
          <div>
            <MovieImg src={item.imageUrl} alt={item.name} />
            <TitleH2>{item.name}</TitleH2>
            <StarRating rating={item.rating} />
          </div>
          <div>
            <LinkBtn to={`/movie/${item.id}`}>
              {t('ver-detalhes')}
            </LinkBtn>
          </div>
        </MovieInfoContainer>
      </MovieContainer>
    </div>
  )
}

export default MovieTemplate
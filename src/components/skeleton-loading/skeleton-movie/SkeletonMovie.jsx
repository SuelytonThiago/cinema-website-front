
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { CategoriesSkeleton, ClassificationSkeleton, Comment, CommentsMovieSkeleton, Container, InputComment, Pages, ReadMoreSkeleton, SessionComentsSkeleton, SkeletonInformations, SkeletonMovieContainer } from './styles'


const SkeletonMovie = () => {
  return (
    <Container>
      <SkeletonMovieContainer>
        <div>
          <Skeleton
            width='250px'
            height='350px' />
        </div>
        <SkeletonInformations>
          <div>
            <Skeleton width='200px' height='40px' />
            <Skeleton width='120px' height='20px' />
            <Skeleton width='100px' height='20px' />
          </div>
          <CategoriesSkeleton>
            <Skeleton width='50px' height='15px' />
            <Skeleton width='50px' height='15px' />
            <Skeleton width='50px' height='15px' />
          </CategoriesSkeleton>
          <ClassificationSkeleton>
            <Skeleton width='100px' height='20px' />
            <Skeleton width='30px' height='20px' />
          </ClassificationSkeleton>
          <div>
            <Skeleton width='120px' height='30px' />
            <Skeleton width='800px' height='20px' />
            <Skeleton width='800px' height='20px' />
            <Skeleton width='800px' height='20px' />
            <Skeleton width='800px' height='20px' />
            <Skeleton width='800px' height='20px' />
            <ReadMoreSkeleton>
              <Skeleton width='720px' height='20px' />
              <Skeleton width='50px' height='20px' />
            </ReadMoreSkeleton>
          </div>
        </SkeletonInformations>
      </SkeletonMovieContainer>
      <SessionComentsSkeleton>
        <Pages>
          <Skeleton width='150px' height='30px' />
          <Skeleton width='150px' height='30px' />
        </Pages>
        <Comment>
          <Skeleton width='50px' height='50px' borderRadius='50%' />
          <div>
            <Skeleton width='100px' />
            <InputComment>
              <Skeleton width='200px' height='40px' />
              <Skeleton width='80px' height='40px' borderRadius='15px' />
            </InputComment>
          </div>
        </Comment>
      </SessionComentsSkeleton>
      <CommentsMovieSkeleton>
        <Comment>
          <Skeleton width='50px' height='50px' borderRadius='50%' />
          <div>
            <Skeleton width='100px' />
            <Skeleton width='70px' />
            <div>
              <Skeleton width='300px' height='20px' />
              <Skeleton width='70px' />
            </div>
          </div>
        </Comment>
      </CommentsMovieSkeleton>

    </Container>
  )
}

export default SkeletonMovie
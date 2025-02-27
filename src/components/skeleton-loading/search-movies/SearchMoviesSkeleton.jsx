import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { SkeletonContainer, SkeletonImg } from './styles'
import { MovieSkeleton } from './styles'

const SearchMoviesSkeleton = () => {
    return (
        <div>
            <SkeletonContainer>
                {[...Array(6)].map((_, i) => (
                    <MovieSkeleton key={i}>
                        <SkeletonImg/>
                        <Skeleton  width='120px' height='20px'/>
                        <Skeleton  width='80px' height='10px'/>
                        <Skeleton width='140px' height='40px' borderRadius='50px'/>
                    </MovieSkeleton>
                ))}
            </SkeletonContainer>
        </div>
    )
}

export default SearchMoviesSkeleton
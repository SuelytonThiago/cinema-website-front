import styled from "styled-components";
import Skeleton from 'react-loading-skeleton'

export const SkeletonContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center ;
    
    @media screen and (max-width: 425px){
        flex-direction: column;
    }

`

export const MovieSkeleton = styled.div`
    text-align: center;
    overflow: hidden;

`

export const SkeletonImg = styled(Skeleton)`
    width: 200px;
    height: 250px;

    @media screen and (max-width: 425px){
        width: 150px;
        height: 200px;
  }

`
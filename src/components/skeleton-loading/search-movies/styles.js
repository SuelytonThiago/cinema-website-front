import styled from "styled-components";
import Skeleton from 'react-loading-skeleton'

export const SkeletonContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-start; 
    overflow-x: auto; 
    scroll-behavior: smooth; 
    padding-bottom: 10px; 

    &::-webkit-scrollbar {
        display: none;
    }
`



export const MovieSkeleton = styled.div`
    text-align: center;

`

export const SkeletonImg = styled(Skeleton)`
    width: 200px;
    height: 250px;

    @media screen and (max-width: 425px){
        width: 150px;
        height: 200px;
  }

`
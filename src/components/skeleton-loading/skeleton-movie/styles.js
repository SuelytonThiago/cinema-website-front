import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const SkeletonMovieContainer = styled.div`
    display: flex;
    gap: 1rem;
  
`
export const SkeletonInformations = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const CategoriesSkeleton = styled.div`
    display: flex;
    gap: 10px;
`

export const ClassificationSkeleton = styled.div`
    display: flex;
    gap: 10px;
`
export const ReadMoreSkeleton = styled.div`
    display: flex;
    gap: 10px;
`

export const SessionComentsSkeleton = styled.div`
    background-color: ${(props) => props.theme.container};
    padding: 1rem;
`

export const Pages = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
`

export const Comment = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;

`

export const InputComment = styled.div`
    display: flex;
    gap: 10px;
`


export const CommentsMovieSkeleton = styled.div`
    background-color: ${(props) => props.theme.container};
    padding: 1rem;
`
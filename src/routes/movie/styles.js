import styled from "styled-components"

export const MovieHeader = styled.div ` 
    display: flex;
    gap: 1rem;
`

export const MovieImg = styled.img `
    max-width: 220px;
    height: auto;
`

export const InfoContainer = styled.div `
    display: flex;
    flex-direction: column;
`

export const InfoHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const CategoriesFilm = styled.div `
    display: flex;
    gap: 10px;
`

export const ClassificationControl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const ClassificationMovie = styled.p`
    display: flex;
    width: 25px;
    height: 25px;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #fff;

    &.rating-L{
        background-color: #00FF00;
    }

    &.rating-10{
        background-color: #0000FF;
    }
    &.rating-12{
        background-color: #FFD700;
    }
    &.rating-14{
        background-color: #FFA500;
    }
    &.rating-16{
        background-color: #FF0000;
    }
    &.rating-18{
        background-color: #332f2f;
    }
`

export const ShowFullDescription = styled.p`
    display: block;
`


export const Description = styled.p `
    display: ${(props) => props.$isExpanded ?  'block' : '-webkit-box'};
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    
`

export const ShowDescriptBtn = styled.button `
    background-color: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    opacity: .7;
    transition: .2;

    &:hover {
        opacity: 1;
    }

`

export const BtnMovieContainer = styled.div` 
    display: flex;
    gap: 10px;
    background-color: #17191f;
    border-bottom: 3px solid #c7baba2c;
`

export const BtnMovieInfoControl = styled.button`
    background-color: transparent;
    color: #fff;
    border: none;
    font-size: 20px;
    padding: .5rem;
    position: relative;
    cursor: pointer;

    &.isVisible {
        border-bottom: 3px solid #1262da;
        margin-bottom: -3px;
        font-weight: bold;
    }
`

export const SessionsMovieContainer = styled.div`
    background-color: #17191f;
`

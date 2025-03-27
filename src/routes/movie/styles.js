import styled from "styled-components"

export const MovieHeader = styled.div ` 
    display: flex;
    gap: 1rem;
    padding: 1rem;
    justify-content: space-between;
    background-color: ${(props) => props.theme.container};

    @media screen and (max-width: 612px){

        flex-direction: column;
    }
`

export const Header = styled.div`
    display: flex;
    gap: .5rem;
`

export const MovieImg = styled.img `
    width: 200px; 
    height: 100%; 
    object-fit: cover;

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
    align-items: center;
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
        background-color:rgb(67, 204, 67);
    }

    &.rating-10{
        background-color:rgb(50, 50, 204);
    }
    &.rating-12{
        background-color:rgb(216, 189, 38);
    }
    &.rating-14{
        background-color:rgb(212, 146, 21);
    }
    &.rating-16{
        background-color:rgb(209, 32, 32);
    }
    &.rating-18{
        background-color:rgb(65, 59, 59);
    }
`

export const AddSessionContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
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
    color: ${(props) => props.theme.fontColor};
    font-weight: bold;

    &:hover {
        opacity: 1;
    }

`

export const BtnMovieContainer = styled.div` 
    display: flex;
    gap: 10px;
    background-color: ${(props) => props.theme.mainContainer};
    border-bottom: 3px solid #c7baba2c;
`   

export const BtnMovieInfoControl = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.fontColor};
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
    background-color: ${(props) => props.theme.mainContainer};
`

export const SessionsContainer = styled.div`

padding: 1rem;
`

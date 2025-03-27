import styled from "styled-components";

export const Review = styled.div`
    background-color: ${(props) => props.theme.mainContainer};
    padding: 1rem;
    display: flex;
    gap: 1rem;
`


export const ReviewUserInfo = styled.div` 
    display: flex;
    gap: 1rem;
    text-transform: uppercase;
`

export const Username = styled.h4`
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const ReviewInfo = styled.div`
    display: flex;
    flex-direction:column;
    
`

export const CommentContainer = styled.p`
    width: 800px;
    height: auto;  
    word-wrap: break-word;  
    overflow-wrap: break-word;   

    @media screen and (max-width:744px){
        
    }
`
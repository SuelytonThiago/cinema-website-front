import styled from "styled-components";

export const SessionContainer = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const SessionInformations = styled.div `
    display: flex;
    gap: 1rem;

    @media screen and (max-width: 868px){
        flex-direction: column;
    }
`

export const EntryRequesting = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainContainer};
`

export const SessionRequestInformations = styled.div`
    background-color: ${(props) => props.theme.mainContainer};
    flex: 1;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const TicketRequestInformations = styled.div`
    height: 530px;
    display: flex;
    flex-direction: column;
`

export const ChairInfo = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;  
    width: 100%;
    color: ${(props) => props.theme.fontColor};
`;

export const TicketInfo = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center; 

    p {
        margin-left: 10px
    }
`


export const MovieInformations = styled.div`
    display: flex;
    gap: 10px;

    img {
        width: 100px;
        height: auto;
    }

    p {
        max-width: 150px;
        overflow: hidden;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const EditDate = styled.div `
    display:flex;
    gap: 1rem;
`

export const SessionTime = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: .5rem 0;

    p{
        font-weight: bold;
        text-transform: uppercase;
    }

    &.editDate {
        font-size: 15px;
        gap: 10px;
    }
`

export const ChairInformation = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: .5rem 0;
`

export const TicketInformation = styled.div` 
    border-bottom: 1px solid #ccc;
    padding: .5rem 0;
`

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SessionRequestControl = styled.div`
    background-color: ${(props) => props.theme.mainContainer};
    padding: 2rem;
    display: flex;
    justify-content: space-between;
`
export const SessionControlBtn = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 15px;
    border: none;
    font-weight: bold;
    color: ${(props) => props.theme.fontColor};
    opacity: .7;
    transition: .3s;
    cursor: pointer;

    &:hover{
        opacity: 1;
    }

    &.disabled {
        background-color: #ccc;
        cursor: not-allowed;

        &:hover {
            opacity: .7;
        }
    }

    &.back{
        background-color: transparent;
        border: 3px solid  ${(props) => props.theme.fontColor};
    } 

    &.next {
        background-color: #FFD700;
        color: #17191f;
    }
`






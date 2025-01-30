import styled from "styled-components";

export const TicketUserContainer = styled.div `
    display: flex;
    border-radius: 8px;
    background-color: ${(props) => props.theme.mainContainer};
    position: relative;
    cursor: pointer;
    height: 160px;
    margin-bottom: 2rem;
`

export const FilmCover = styled.div`
    width: 120px;
    height: 160px;
    display: flex;
    background-color: #eee;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
        z-index: 1;
    }
`

export const TicketData = styled.div `
    display: flex;
    flex-direction: column;
    font-size: 14px;
    background-color: ${(props) => props.theme.mainContainer};
    position: absolute;
    top: 60%;
    z-index: 2;
    width: 100%;
    border-radius: 0 0 15px 15px;
    padding: .5rem;

`

export const SessionDate = styled.div `
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const H4  = styled.h4`
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const SessionDay = styled.div `
    text-align: center;
    padding: .2rem;
`

export const TicketDetails = styled.div `
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    font-weight: bold;
`
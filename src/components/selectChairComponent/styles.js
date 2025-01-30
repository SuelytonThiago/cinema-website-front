import styled from "styled-components";

export const SessionInfoTime= styled.div`
    padding: 1rem;
    background-color: ${(props) => props.theme.mainContainer};
    border-bottom: 1px solid #ccc;
    display: flex;
    gap: 5rem;
    justify-content: center;

    p {
        display: flex;
        gap: .3rem;
        align-items: center; 
    }
`
export const EditDate = styled.div`
    display: flex;
    gap: .3rem;
    align-items: center;
`

export const ChairsContainer = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.mainContainer};
    padding: 1rem;
    flex-direction: column;
`

export const Chairs = styled.div `
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    align-items: center;
    gap: 10px; 
    padding: 2rem;
    background-color: ${(props) => props.theme.mainContainer};
    max-width:60%;
    margin: 0 auto;
`

export const Chair = styled.button`
    width: 30px; 
    height: 30px; 
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    padding: .5rem;

    &.chairAvailable {
        background-color: #E3D7A3;
        color: #000;
        opacity: .8;
        transition: .3s;

        &:hover {
            opacity: 1;
        }
    }

    &.chairUnavailable {
        background-color: #B5A1C7;
    }

    &.selectedChair {
        background-color: #FFD700;
        opacity: 1;
        color: #000;
    }


`

export const LegendSpan = styled(Chair)``

export const RoomScreen = styled.div`
    width: 100%; 
    height: 20px; 
    background-color: rgb(87, 184, 216); 
    clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%);
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: white; 
    font-size: 16px; 
    margin-top: 2rem;
`

export const LegendContainer = styled.div `
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem ;
    background-color: ${(props) => props.theme.mainContainer};
    justify-content: space-around;
    border-top: 1px solid #ccc;

`


export const LegendInfo = styled.div `
    display: flex;
    gap: .5rem;
    align-items: center;
`

import styled from "styled-components";

export const TicketsDetalContainer = styled.div `
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    justify-content: center;

    h2 {
        background-color: ${(props) => props.theme.mainContainer};
        width: 100%;
        text-align: center;
        padding: .5rem;
        border-radius: 5px 5px 0 0;
    }
`

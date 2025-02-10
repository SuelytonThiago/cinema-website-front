import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
    border-radius: 5px;
    background-color:${(props) => props.theme.container};
   
`
import styled ,{keyframes} from "styled-components";

const animation = keyframes`
    0%{
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
    
`


export const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    background-color:${(props) => props.theme.container};
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 1rem;
    border: ${(props) => props.theme.border};
    
    &.loading {
        background-color: #17191f; 
        animation: ${animation} 1.5s infinite alternate;
        width: 100%;
        height: 110px;
    }
`


export const CategoryBtn = styled.button `
    display: flex;
    align-items: center;
    gap: 5px;
    flex: 1 0 10%;
    max-width: 10%;
    background-color: transparent;
    color: ${(props) => props.$active ? '#1877F2' : props.theme.fontColor };
    border: none;
    opacity: ${(props) => props.$active ? '1' : '.7'};
    transition: .3s;
    cursor: pointer;
    font-size: 15px;
    ${(props) => props.$active && `font-weight: bold;`}

    &:hover {
        opacity: 1
    }

`



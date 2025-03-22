import styled from "styled-components";

export const CategoriesContainer = styled.div`
    position: absolute;
    width: 300px;                 
    top: 58%;                     
    left: 50%;                    
    transform: translateX(-50%); 
    max-height: 150px;            
    overflow-y: auto;           
    background-color: white;    
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    z-index: 10;  
    
`;

export const CategoryBtn = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: .2s;
    padding: .5rem;
    text-transform: uppercase;
    &:hover {
        color: #1877F2;
    }
`

export const Li = styled.li`
    border-bottom: 1px solid #ccc;
`

export const P = styled.p`
    color: #000;
    display: flex;
    padding: .5rem;
    gap: .5rem;
    align-items: center;
    justify-content: center;
`

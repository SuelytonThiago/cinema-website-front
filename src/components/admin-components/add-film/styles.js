import styled from "styled-components";

export const CategoryBtn = styled.button`
    width: 30px;
    height: 30px;
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);

    &.activate {
        width: 35px;
        height: 35px;
    }

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

export const ClassificationBtn = styled.div`
    display: flex;
    justify-content: space-around;
`

export const ClassificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const FileInput = styled.label`
    background-color: #fff;
    color:#000;
    cursor: pointer;
`

export const FileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const XBtn = styled.button`
    background-color: transparent;
    cursor: pointer;
    color: red;
    border: none;
`

export const Textarea = styled.textarea`
    height: 200px;
    padding: 1rem ;

    &.error {
        border: 1px solid red;
    }

    &:focus {
        outline: none;
        box-shadow: none;
        border:1px solid #1877F2;   
    }
`


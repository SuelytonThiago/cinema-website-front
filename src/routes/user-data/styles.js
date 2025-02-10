import styled from "styled-components";

export const UserDataContainer = styled.div`
    display: flex;
    gap: 2rem;
`

export const UserDataControl = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 450px;
    height: 80vh;
    background-color: ${(props) => props.theme.mainContainer};
    padding: 2rem 0 2rem 2rem;
`

export const UserImgProfileContainer = styled.div`  
    display: flex;
    gap: 1rem;
    align-items: center;
    position: relative;
`

export const UserImg = styled.div` 
    transition: .3s;
    cursor: pointer;
    position: relative;
    width: 65px;
    height: 65px;
    cursor: pointer;


    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #ccc;
        transition: .2s;
        z-index: 2;
        border: ${(props) => props.theme.border};

        &:hover {
            opacity: .3;
        }

    }
`




export const UserInfos = styled.div `
    max-width: 200px;

    p {
        white-space: nowrap; 
        overflow: hidden;  
        text-overflow: ellipsis; 
    }

    h3 {
        white-space: nowrap; 
        overflow: hidden;  
        text-overflow: ellipsis; 
    }
`

export const UserDataLinks = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-around;
`


export const UserDataBtn = styled.button `
    background-color: #4f535f;
    padding: .5rem;
    border: none;
    border-radius: 25px 0 0 25px;
    color: #fff;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 15px;
    cursor: pointer;

    &.activatebtnSS {
        background-color: #1877F2;
    }

`

export const Exit = styled.button ` 
    background-color: transparent;
    color: #1877F2;
    border: none;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    opacity: .78;
    transition: .3s;
`




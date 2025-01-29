import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.fontColor}
    }

    body a{
        color: ${props => props.theme.fontColor}
    }

    body p{
        color: ${props =>props.theme.p}
    }

`
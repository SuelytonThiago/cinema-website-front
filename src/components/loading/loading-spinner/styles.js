import styled, { keyframes } from "styled-components"

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

export const Spinner = styled.div`
    
  border: 4px solid #ccc; 
  border-top: 4px solid #000; 
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite; 


`

import styled from "styled-components";



export const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius:5px;
`

export const MovieInfoContainer = styled.div `
  max-width: 300px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction:column;
  gap: 1rem 
`
  
export const MovieImg = styled.img `
  width: 100 %;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`

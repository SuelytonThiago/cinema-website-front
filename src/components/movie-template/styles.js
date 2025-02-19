import styled from "styled-components";



export const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius:5px;
`

export const MovieInfoContainer = styled.div `
  max-width: 220px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction:column;
  gap: 1rem ;

  @media screen and (max-width: 425px){
    max-width: 150px;
  }
`
  
export const MovieImg = styled.img `
  width: 220px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  
  @media screen and (max-width: 425px){
    width: 170px;
    height: 250px;
  }
`

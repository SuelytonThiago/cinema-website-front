import styled from "styled-components"

export const FileInput = styled.label`
    background-color: #fff;
    color:#000;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%; 
    overflow: hidden;

`

export const XBtn = styled.button`
    background-color: transparent;
    cursor: pointer;
    color: red;
    border: none;
`

export const FileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

export const Span = styled.span`
    white-space: nowrap;  /* Impede a quebra de linha no texto */
    overflow: hidden;     /* Oculta qualquer texto que ultrapasse o container */
    text-overflow: ellipsis;  /* Exibe '...' quando o texto for muito longo */
    max-width: 200px;     /* Ajuste o tamanho do max-width conforme necessário */
    text-overflow: ellipsis;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: .5rem;

`
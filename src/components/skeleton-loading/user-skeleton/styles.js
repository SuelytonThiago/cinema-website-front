import styled from "styled-components";


export const ControllerContainerSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 450px;
    height: 80vh;
    background-color: ${(props) => props.theme.mainContainer};
    padding: 2rem 0 2rem 2rem;

`

export const UserDataSkeleton = styled.div`

    display: flex;
    gap: 1rem;
`



export const DataLinksSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`


export const FormDataContainerSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`


export const InputContainerSkeleton = styled.div`

`



export const SubmitControlSkeleton = styled.div`

    background-color: ${(props) => props.theme.mainContainer};
    border-radius: 25px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 700px;
`

export const SubmitInputSkeleton = styled.div`
    display: flex;
    gap: 1rem;

`

export const TicketSkeleton = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`


export const TicketContainerSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-wrap: wrap;
`
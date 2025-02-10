import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const SkeletonContainer = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.mainContainer};
    width: 100%;
    padding: 1rem;
    gap: 1rem;
`

export const SkeletonInfos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

export const SkeletonFilter = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${(props) => props.theme.mainContainer};
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
`


export const SkeletonFilterBtn = styled(Skeleton)`
    width: '60px';
    height:'40px';
`
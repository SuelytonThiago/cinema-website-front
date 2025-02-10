import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Container, SkeletonContainer, SkeletonFilter, SkeletonInfos } from './styles.js'
import { useTheme } from 'styled-components'

const SkeletonSession = () => {

    const theme = useTheme(); 

    return (
        <Container>
            <SkeletonFilter>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i}
                    width='60px' 
                    height='40px'/>
                ))}             
            </SkeletonFilter>
            <Skeleton 
            width='180px' 
            height='40px' />
            <SkeletonContainer>
                <div>
                    <Skeleton 
                    width='200px' 
                    height='300px' />
                </div>
                <SkeletonInfos>
                    <div>
                        <Skeleton width='200px' height='40px' />
                        <Skeleton width='120px' height='20px' />
                        <Skeleton width='100px' height='20px' />
                    </div>
                    <Skeleton width='130px' height='50px' borderRadius='50px' />
                </SkeletonInfos>
            </SkeletonContainer>
        </Container>
    )
}

export default SkeletonSession
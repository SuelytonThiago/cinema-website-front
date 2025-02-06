import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Container, SkeletonContainer, SkeletonFilter, SkeletonInfos } from './styles'
import { useTheme } from 'styled-components'

const SkeletonSession = () => {

    const theme = useTheme(); 

    return (
        <Container>
            <SkeletonFilter>
                {[...Array(5)].map((_, i) => (
                    <Skeleton 
                    width='60px' 
                    height='40px' 
                    baseColor={theme.loadingBase}  
                    highlightColor= {theme.loadingEfect}/>
                ))}             
            </SkeletonFilter>
            <Skeleton 
            width='180px' 
            height='40px' 
            baseColor={theme.loadingBase}  
            highlightColor= {theme.loadingEfect}/>
            <SkeletonContainer>
                <div>
                    <Skeleton 
                    width='200px' 
                    height='300px' 
                    baseColor={theme.loadingBase}  
                    highlightColor= {theme.loadingEfect} />
                </div>
                <SkeletonInfos>
                    <div>
                        <Skeleton width='200px' height='40px' baseColor={theme.loadingBase} highlightColor= {theme.loadingEfect} />
                        <Skeleton width='120px' height='20px' baseColor={theme.loadingBase} highlightColor= {theme.loadingEfect} />
                        <Skeleton width='100px' height='20px' baseColor={theme.loadingBase} highlightColor= {theme.loadingEfect} />
                    </div>
                    <Skeleton width='130px' height='50px' baseColor={theme.loadingBase} highlightColor= {theme.loadingEfect} borderRadius='50px' />
                </SkeletonInfos>
            </SkeletonContainer>
        </Container>
    )
}

export default SkeletonSession
import React from 'react'
import { Container } from './styles'
import Skeleton from 'react-loading-skeleton'

const CategorySkeleton = () => {
    return (
        <div>
            <Container>
                {[...Array(38)].map((_, i) => (
                    <Skeleton key={i}
                        width='40px'
                        height='10px' />
                ))}
            </Container>
        </div>
    )
}

export default CategorySkeleton
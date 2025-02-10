import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { TicketContainerSkeleton, TicketSkeleton } from './styles'
import { Container } from '../session-skeleton/styles'

const MyTicketsSkeleton = () => {
    return (
        <TicketContainerSkeleton>
            <TicketSkeleton>
                {[...Array(5)].map((_, i) => (
                    <Skeleton width='110px' height='160px' />
                ))}
            </TicketSkeleton>
        </TicketContainerSkeleton>
    )
}

export default MyTicketsSkeleton
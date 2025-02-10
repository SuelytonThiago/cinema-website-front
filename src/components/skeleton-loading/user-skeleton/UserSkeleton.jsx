import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { ControllerContainerSkeleton, DataLinksSkeleton, UserDataSkeleton } from './styles'


const UserSkeleton = () => {
    return (
        <div>
            <ControllerContainerSkeleton>
                <UserDataSkeleton>
                    <Skeleton width='80px' height='80px' borderRadius='50%' />
                    <div>
                        <Skeleton width='150px' height='30px' />
                        <Skeleton width='180px' height='30px' />
                        <Skeleton width='170px' height='30px' />
                    </div>
                </UserDataSkeleton>
                <DataLinksSkeleton>
                    <Skeleton width='300px' height='30px' />
                    <Skeleton width='300px' height='30px' />
                </DataLinksSkeleton>
                <div>
                    <Skeleton width='50px' height='20px' />
                </div>
            </ControllerContainerSkeleton>
        </div>
    )
}

export default UserSkeleton
import React from 'react'

import Skeleton from 'react-loading-skeleton'
import { FormDataContainerSkeleton, InputContainerSkeleton, SubmitControlSkeleton, SubmitInputSkeleton } from './styles'

const MyUserDataSkeleton = () => {
    return (
        <div>
            <FormDataContainerSkeleton>
                <InputContainerSkeleton>
                    <Skeleton width='200px' height='30px' />
                    <Skeleton width='700px' height='50px' />
                    <Skeleton width='700px' height='50px' />
                    <Skeleton width='700px' height='50px' />
                    <Skeleton width='700px' height='50px' />
                    <Skeleton width='700px' height='50px' />

                </InputContainerSkeleton>
                <SubmitControlSkeleton>
                    <Skeleton width='300px' height='30px' />
                    <div>
                        <Skeleton width='600px' height='20px' />
                        <Skeleton width='300px' height='20px' />
                    </div>

                    <SubmitInputSkeleton>
                        <Skeleton width='250px' height='40px' />
                        <Skeleton width='90px' height='40px' />
                    </SubmitInputSkeleton>
                </SubmitControlSkeleton>


            </FormDataContainerSkeleton>
        </div>
    )
}

export default MyUserDataSkeleton
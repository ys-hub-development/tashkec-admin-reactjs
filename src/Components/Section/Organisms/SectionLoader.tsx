import { ReactNode } from 'react'
import { Box } from '@mui/material'
import cn from 'classnames'
import { Preloader } from 'Components/UI/Preloader'

type Props = {
  isLoading: boolean
  isFetching: boolean
  children: ReactNode
}

export const SectionLoader = ({ isFetching, children, isLoading }: Props) => {
  return (
    <Box minHeight={isLoading ? '300px' : undefined} position='relative'>
      {children}
      <div className={cn('spinner', { isLoading, isFetching: !isLoading && isFetching })}>
        <Preloader />
      </div>
    </Box>
  )
}

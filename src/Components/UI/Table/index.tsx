import { Stack } from '@mui/material'
import { StyledThead } from 'Components/UI/Table/style'
import { TableColumnType } from 'Types/app'
import { useEffect } from 'react'
import httpClient from 'Service'

type Props<D> = {
  columns: TableColumnType<D>[]
  showHead?: boolean
}

export function TableUI<D>({ columns }: Props<D>) {
  useEffect(() => {
    httpClient.get('/account/me')
  }, [])
  console.log(columns)
  return (
    <Stack spacing={2}>
      <StyledThead>

      </StyledThead>
    </Stack>
  )
}
import { Menu, MenuItem } from '@mui/material'
import { Stack } from '@mui/system'
import { APP } from 'Constants/App'
import { URL_KEYS } from 'Constants/Url'
import { WorkPlanTypeEnum } from 'Entities/about'
import { ChevronDownIcon } from 'Icons/Chevron'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const WorkplantFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const _type: any = searchParams.get(URL_KEYS.TIME_TYPE)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleSelect = useCallback(
    (type: WorkPlanTypeEnum) => {
      if (type === _type) {
        searchParams.delete(URL_KEYS.TIME_TYPE)
      } else {
        searchParams.set(URL_KEYS.TIME_TYPE, type)
      }
      setSearchParams(searchParams)
      setAnchorEl(null)
    },
    [searchParams, setSearchParams, _type],
  )

  return (
    <>
      <Stack
        direction='row'
        id='basic-button'
        alignItems='center'
        aria-haspopup='true'
        color='text.secondary'
        onClick={handleClick}
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'basic-menu' : undefined}
        sx={{ cursor: 'pointer' }}>
        <div>{APP.FILTER}</div>
        <ChevronDownIcon />
      </Stack>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        BackdropProps={{ style: { background: 'unset' } }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem selected={_type && _type === WorkPlanTypeEnum.YEAR} onClick={() => handleSelect(WorkPlanTypeEnum.YEAR)}>
          {APP.YEAR}
        </MenuItem>
        <MenuItem selected={_type && _type === WorkPlanTypeEnum.MONTH} onClick={() => handleSelect(WorkPlanTypeEnum.MONTH)}>
          {APP.MONTH}
        </MenuItem>
      </Menu>
    </>
  )
}

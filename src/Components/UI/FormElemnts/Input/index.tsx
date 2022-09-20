import { InputUnstyledProps } from '@mui/base/InputUnstyled'
import { ForwardedRef, forwardRef, ReactNode, useMemo, useState } from 'react'
import { InputRoot, StyledInputElement } from './style'
import { Box, Stack } from '@mui/material'
import cn from 'classnames'
import { EndAdornmentWrapper, InputHelperText, InputWrapper, Label } from '../style'

type Props = InputUnstyledProps & {
  label: string
  labelNode?: ReactNode
  helperText?: string
}

export const InputUI = forwardRef(function CustomInput(
  { label, type, labelNode, helperText, required, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [ passwordVisible, setPasswordVisible ] = useState<boolean>(false)

  const inputType = useMemo((): any => {
    if (type === 'password') {
      return passwordVisible ? 'text' : 'password'
    }

    return type
  }, [ passwordVisible, type ])

  const endAdornment = useMemo((): ReactNode | undefined => {
    if (type === 'password') {
      return (
        <EndAdornmentWrapper>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {
              passwordVisible
                ? <i className='bx bx-show' />
                : <i className='bx bx-hide' />
            }
          </Box>
        </EndAdornmentWrapper>
      )
    }
    return props.endAdornment ? <EndAdornmentWrapper> {props.endAdornment}</EndAdornmentWrapper> : undefined
  }, [ type, props.endAdornment, passwordVisible ])

  return (
    <InputWrapper>
      <Stack justifyContent='space-between' direction='row' marginBottom='0.5rem' width='100%'>
        <Label htmlFor={`${label}_id`} required={required}>
          {label}
        </Label>
        {labelNode}
      </Stack>
      <InputRoot
        {...props}
        ref={ref}
        id={`${label}_id`}
        type={inputType}
        components={{ Input: StyledInputElement }}
        endAdornment={endAdornment}
      />
      <InputHelperText className={cn({ show: !!helperText, error: !!props.error })}>{helperText}</InputHelperText>
    </InputWrapper>
  )
})

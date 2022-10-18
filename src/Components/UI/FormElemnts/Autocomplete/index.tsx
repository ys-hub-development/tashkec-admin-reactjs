import { Autocomplete, Box, Chip, CircularProgress, Stack, TextField, Tooltip } from '@mui/material'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { IAutoCompleteOption } from 'Types/app'
import { truncateString } from 'Utils/StringUtils'
import { InputHelperText, InputWrapper, Label } from '../style'
import cn from 'classnames'


interface IProps {
  label: string;
  options: IAutoCompleteOption[];
  onLoadMore?: (e: any) => void;
  value: IAutoCompleteOption | IAutoCompleteOption[] | null;
  onChange: (value: IAutoCompleteOption | null) => void;
  placeholder?: string;
  onSearch?: (value: string | null, noSend?: boolean) => void;
  loading?: boolean;
  onBlur?: () => void;
  multiple?: boolean | undefined;
  disabled?: boolean;
  size?: 'small' | 'medium';
  limitTags?: number
  error?: string,
  required?: boolean
}

export function AutocompleteUI(
  {
    label,
    value,
    options,
    onLoadMore,
    onChange,
    placeholder,
    onSearch,
    loading,
    onBlur,
    multiple,
    disabled,
    size,
    limitTags,
    required,
    error,
  }: IProps) {
  const [ inputValue, setInputValue ] = useState<string>('')

  const renderOption = useCallback((props: React.HTMLAttributes<HTMLLIElement>, option: IAutoCompleteOption) => {
    return (
      <li {...props} style={{ fontSize: '14px' }}>
        {option.label}
      </li>
    )
  }, [])

  const handleChange = useCallback((newValue: any) => {
    setInputValue('')
    if (onSearch) {
      onSearch(null, inputValue.length === 0)
    }
    onChange(newValue)
  }, [ onSearch, onChange, inputValue ])

  return (
    <InputWrapper>
      <Stack justifyContent='space-between' direction='row' marginBottom='0.5rem' width='100%'>
        <Label required={required}>
          {label}
        </Label>
      </Stack>
      <Autocomplete
        limitTags={limitTags || 2}
        value={value}
        placeholder={placeholder}
        options={options}
        loading={!!loading}
        multiple={multiple}
        disabled={!!disabled}
        selectOnFocus
        includeInputInList
        onBlur={onBlur}
        classes={{ paper: 'select-dropdown' }}
        isOptionEqualToValue={(options, selected) => {
          return options.value === selected.value
        }}
        filterOptions={(v) => v}
        getOptionLabel={option => option.label}
        renderOption={(props, option) => renderOption(props, option)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant='outlined'
              label={(
                <>
                  {
                    typeof option.label === 'string' && option.label.length > 30
                      ? (
                        <Tooltip title={option.label}>
                          <Box>
                            {truncateString(option.label, 30)}
                          </Box>
                        </Tooltip>
                      )
                      : option.label
                  }
                </>
              )}
              size='small'
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        ListboxProps={{
          onScroll: (e) => onLoadMore && onLoadMore(e),
          style: { maxHeight: 40 * 8 + 8, backgroundColor: '#fff' },
        }}
        onChange={(e, value) => handleChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            size={size || 'small'}
            error={!!error}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color='inherit' size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            onChange={(e) => {
              if (onSearch) {
                setInputValue(e.target.value)
                if (e.target.value.length === 0) {
                  onSearch(null, true)
                } else {
                  onSearch(e.target.value)
                }
              }
            }}
          />
        )}
      />
      <InputHelperText className={cn({ show: !!error, error: !!error })}>{error}</InputHelperText>
    </InputWrapper>
  )
}
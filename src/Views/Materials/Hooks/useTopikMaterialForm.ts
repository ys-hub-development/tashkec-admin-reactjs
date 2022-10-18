import { useForm } from 'react-hook-form'
import { ITopikMaterial } from 'Entities/material'
import { useCallback, useEffect, useMemo } from 'react'
import { useTopikMaterial } from 'Hooks'
import { ApiActionParamType, ControllerHookProps, LangError } from 'Types/app'
import { updateDialogEvent } from 'Models'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'

type Values = Omit<ITopikMaterial, 'id'>
type Props = ControllerHookProps

export function useTopikMaterialForm({ initList, detailId, extraId }: Props) {
  const { create, update, listQuery: { refetch }, detailQuery: { data } } = useTopikMaterial({
    initList,
    detailId,
    extraId,
  })

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleRu: '',
      titleUz: '',
    },
    resolver: yupResolver(schema)
  })

  const action = useCallback((field?: ApiActionParamType) => {
    if (!field?.['err']) {
      refetch()
      updateDialogEvent(null)
    }
  }, [ refetch ])

  const onSubmit = useCallback((values: Values) => {
    if (detailId) {
      update.mutate({ id: detailId, data: { ...values, id: Number(detailId) }, action })
    } else {
      create.mutate({ data: values, action })
    }
  }, [create, detailId, update, action])

  const {
    formState: { errors },
    setValue,
  } = form

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const langError: Partial<LangError> = {
    Ru: !!errors.titleRu?.message,
    Uz: !!errors.titleUz?.message,
    Kr: !!errors.titleKr?.message,
  }

  const disabled = useMemo(() => {
    return Object.values(langError).findIndex(item => item) !== -1
  }, [ langError ])

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [ create, update ])

  useEffect(() => {
    if (data && detailId) {
      setValue('titleUz', data.titleUz)
      setValue('titleRu', data.titleRu)
      setValue('titleKr', data.titleKr)
    }
  }, [ data, detailId, setValue ])

  return {
    form,
    onSubmit,
    disabled,
    langError,
    isLoading,
  }
}
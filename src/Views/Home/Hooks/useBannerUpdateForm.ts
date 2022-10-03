import { useForm } from 'react-hook-form'
import { Banner } from 'Entities/main'
import { useCallback, useEffect, useMemo } from 'react'
import { ControllerHookProps } from 'Types/app'
import { useBanner } from 'Hooks'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { updateDialogEvent } from 'Models'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'

type Values = Pick<Banner, 'name' | 'sliderUrl' | 'id'>
type Props = ControllerHookProps

export function useBannerUpdateForm(props: Props) {
  const { detailQuery: { data } } = useBanner(props)

  const update = useMutation(
    ({ data, id }: any) => httpClient.patch<Banner>(`/api/sliders/${id}`, data),
    {
      onSuccess: () => {
        toast.success(APP.DATA_SUCCESS_SAVED)
        updateDialogEvent(null)
      },
    },
  )

  const schema = yup.object().shape({
    name: yup.string().required(APP.REQUIRED_FIELD),
    sliderUrl: yup.string().test('test', APP.ERROR_LINK, (value: any) => {
      if (value === undefined || value === '') {
        return true
      } else {
        return value.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/)
      }
    }),
  })

  const form = useForm<Values>({
    defaultValues: {
      name: '',
      sliderUrl: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback((values: Values) => {

    const d: any = {
      name: values.name,
      id: values.id
    }
    if (values.sliderUrl?.length) {
      d.sliderUrl = values.sliderUrl
    }

    update.mutate({
      data: d,
      id: props.detailId,
    })
  }, [ props.detailId, update ])

  const { setValue, formState: { errors } } = form

  useEffect(() => {
    if (props.detailId && data) {
      setValue('name', data.name || '')
      setValue('sliderUrl', data.sliderUrl || '')
      setValue('id', data.id)
    }
  }, [ data, props.detailId, setValue ])

  const isLoading = useMemo(() => update.isLoading, [ update.isLoading ])
  const disabled = useMemo(() => !!errors.name?.message, [ errors ])

  return { form, isLoading, disabled, onSubmit }
}
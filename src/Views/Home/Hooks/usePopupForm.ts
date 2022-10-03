import { useForm } from 'react-hook-form'
import { usePopup } from 'Hooks'
import { ControllerHookProps, CRUDApi } from 'Types/app'
import { Popup } from 'Entities/main'
import { useCallback, useEffect, useMemo, useState } from 'react'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { updateDialogEvent } from 'Models'
import { toast } from 'react-toastify'

type Props = ControllerHookProps
type Values = Omit<Popup, 'id' | 'attachment'> & {
  file: File | null | 1,
  imgUrl: string | null
}

const schemaImage = yup.object().shape({
  file: yup.mixed().required(APP.REQUIRED_FIELD),
  redirectUrl: yup.mixed().test('test', APP.ERROR_LINK, (value: any) => {
    if (value === undefined || value === '') {
      return true
    } else {
      return value.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/)
    }
  }),
})

const schemaVideo = yup.object().shape({
  videoUrl: yup.string().required(APP.REQUIRED_FIELD).test('test', APP.ERROR_LINK, (value: any) => {
    if (value === undefined || value === '') {
      return true
    } else {
      return value.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/)
    }
  }),
})

export function usePopupForm({ detailId, initList }: Props) {
  const { create, listQuery: { refetch }, detailQuery: {data} } = usePopup({ detailId, initList })
  const [ schema, setSchema ] = useState<any>(schemaImage)

  const update = useMutation(
    ({ id, data }: CRUDApi<Partial<Popup>>) => httpClient.patch<Popup>(`/api/popups/${id}`, data),
    {
      onSuccess: () => {
        refetch()
        updateDialogEvent(null)
        toast.success(APP.DATA_SUCCESS_CHANGED)
      },
    },
  )

  const form = useForm<Values>({
    defaultValues: {
      videoUrl: '',
      redirectUrl: '',
      isImage: true,
      file: null,
      imgUrl: null,
    },
    resolver: yupResolver(schema),
  })


  const onSubmit = useCallback((values: Values) => {
    const { isImage, file, videoUrl, redirectUrl } = values

    if (detailId) {
      const v: Partial<Popup> = {
        isImage,
      }

      if (isImage && redirectUrl?.length) {
        v.redirectUrl = redirectUrl
      }

      if (!isImage && videoUrl?.length) {
        v.videoUrl = videoUrl
      }
      update.mutate({ id: detailId, data: {...v, id: Number(detailId)} })

    } else {
      const formData = new FormData()
      if (isImage && file && file !== 1) {
        formData.append('isImage', '1')
        formData.append('file', file)
        if (redirectUrl?.length) {
          formData.append('redirectUrl', redirectUrl)
        }
      } else {
        if (videoUrl?.length) {
          formData.append('isImage', '0')
          formData.append('videoUrl', videoUrl)
        }
      }
      create.mutate({
        data: formData, action: () => {
          refetch()
          updateDialogEvent(null)
        },
      })
    }
  }, [create, detailId, refetch, update])

  const { setValue, setError } = form
  const isLoading = useMemo(() => update.isLoading || create.isLoading, [ create, update ])
  const disabled = useMemo(() => false, [])

  const onChangeIsImage = useCallback((status: boolean) => {
    setError('file', {})
    setError('videoUrl', {})
    setValue('isImage', status)
    if (status) {
      setSchema(schemaImage)
    } else {
      setSchema(schemaVideo)
    }
  }, [ setError, setValue ])

  useEffect(() => {
    if(detailId && data) {
      setValue('redirectUrl', data.redirectUrl || '')
      setValue('videoUrl', data.videoUrl || '')
      setValue('imgUrl', data?.attachment?.path || null)
      setValue('isImage', data.isImage)
      setValue('file', 1)
    }
  }, [data, detailId, setValue])

  return { form, onSubmit, isLoading, disabled, onChangeIsImage }
}
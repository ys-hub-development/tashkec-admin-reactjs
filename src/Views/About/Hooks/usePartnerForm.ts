import * as yup from 'yup'
import { APP } from 'Constants/App'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo } from 'react'
import { ApiActionParamType, ControllerHookProps, LangError } from 'Types/app'
import { IPartner } from 'Entities/about'
import { usePartner } from 'Hooks/About/usePartner'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { Response } from 'Types/api'
import { IAttachmentBase } from 'Entities/attachment'
import { updateDialogEvent } from 'Models'

type Props = ControllerHookProps
type Values = Omit<IPartner, 'id' | 'attachment'> & {
  file: File | null | 1,
  imgUrl: string | null
}

type AttachmentCreate = {
  data: FormData,
  action: (id: number) => void
}

export function usePartnerForm({ detailId, initList }: Props) {
  const {
    listQuery: { refetch },
    update,
    create,
    detailQuery: { data },
  } = usePartner({ initList, detailId })
  const createAttachment = useMutation(
    ({ data }: AttachmentCreate) => httpClient.post<Response<IAttachmentBase>>('/api/attachments/partner', undefined, { params: data }),
    {
      onSuccess: (res, { action }) => {
        action(res.data.object.id)
      },
    },
  )

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    file: yup.mixed().required(APP.REQUIRED_FIELD),
    webUrl: yup.string().test('test', APP.ERROR_LINK, (value: any) => {
      if (value === undefined || value === '') {
        return true
      } else {
        return value.match(/^(https?|chrome|http?):\/\/[^\s$.?#].[^\s]*$/)
      }
    }),
    youtubeUrl: yup.string().test('test', APP.ERROR_LINK, (value: any) => {
      if (value === undefined || value === '') {
        return true
      } else {
        return value.match(/^(https?|chrome|http?):\/\/[^\s$.?#].[^\s]*$/)
      }
    }),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleRu: '',
      titleUz: '',
      webUrl: '',
      youtubeUrl: '',
      file: null,
      imgUrl: null,
    },
    resolver: yupResolver(schema),
  })

  const action = useCallback(
    (field?: ApiActionParamType) => {
      if (!field?.['err']) {
        refetch()
        updateDialogEvent(null)
      }
    },
    [ refetch ],
  )

  const createAction = useCallback((values: Values, id: number) => {
    create.mutate({
      data: {
        attachmentId: id,
        titleRu: values.titleRu,
        titleUz: values.titleUz,
        titleKr: values.titleKr,
        webUrl: values.webUrl,
        youtubeUrl: values.youtubeUrl,
      },
      action,
    })
  }, [ action, create ])

  const onSubmit = useCallback(
    (values: Values) => {
      if (detailId && data) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {file, imgUrl, attachmentId, ...v} = values
        update.mutate({ data: {...data, ...v}, id: detailId, action })
      } else {
        if (values.file && values.file !== 1) {
          const formData = new FormData()
          formData.append('multipartFile', values.file)
          createAttachment.mutate({ data: formData, action: (id) => createAction(values, id) })
        }
      }
    },
    [ action, createAction, createAttachment, detailId, update, data ],
  )

  const isLoading = useMemo(() => (
    create.isLoading || update.isLoading || createAttachment.isLoading
  ), [ create.isLoading, update.isLoading, createAttachment.isLoading ])

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

  useEffect(() => {
    if (detailId && data) {
      setValue('titleUz', data.titleUz)
      setValue('titleKr', data.titleKr)
      setValue('titleRu', data.titleRu)
      setValue('file', 1)
      setValue('webUrl', data.webUrl)
      setValue('youtubeUrl', data.youtubeUrl || '')
      setValue('imgUrl', data.attachment.path || '')
    }
  }, [ data, detailId, setValue ])

  return { form, onSubmit, isLoading, disabled, langError }
}
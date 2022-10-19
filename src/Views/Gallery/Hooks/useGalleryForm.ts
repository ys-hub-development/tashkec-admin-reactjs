import { yupResolver } from '@hookform/resolvers/yup'
import { APP } from 'Constants/App'
import { GalleryPath } from 'Constants/Navigation'
import { CenterHistory } from 'Entities/about'
import { useGallery, useGalleryAttachment } from 'Hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApiActionParamType, ControllerHookProps, LangError } from 'Types/app'
import * as yup from 'yup'
import { IGallery, MainPhotoMutation } from 'Entities/gallery'
import { MainMediaFile } from 'Views/Home/types'
import { fileToBase64 } from 'Utils'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { Response } from 'Types/api'
import { IAttachmentBase } from 'Entities/attachment'

type Props = ControllerHookProps
type Values = Omit<IGallery, 'id'>

export function useGalleryForm({ detailId }: Props) {
  const [files, setFiles] = useState<MainMediaFile[]>([])
  const navigate = useNavigate()
  const {
    update,
    create,
    detailQuery: { data },
  } = useGallery({ initList: false, detailId })
  const { create: createAttachment } = useGalleryAttachment({ initList: false, extraId: detailId })
  const mainPhotoMutation = useMutation(
    ({ data }: MainPhotoMutation) =>
      httpClient.post<Response<IAttachmentBase>>('/api/attachments/set-main-photo/', undefined, { params: data }),
    {
      onSuccess: (_, { action }) => {
        if (action) {
          action()
        }
      },
    },
  )

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    publishedDate: yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleRu: '',
      titleUz: '',
      publishedDate: '',
    },
    resolver: yupResolver(schema),
  })

  const action = useCallback(
    (field?: ApiActionParamType) => {
      if (!field?.['err']) {
        navigate(`/${GalleryPath.main}`)
      }
    },
    [navigate],
  )

  const setMainImage = useCallback(
    (d: MainPhotoMutation) => {
      mainPhotoMutation.mutate(d)
    },
    [mainPhotoMutation],
  )

  const onCreateAttachment = useCallback(
    (field?: ApiActionParamType) => {
      if (field?.data && files.length > 0) {
        const gallery: IGallery = field.data
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData()
          formData.append('multipartFile', files[i].file)
          formData.append('photoGalleryId', String(gallery.id))
          createAttachment.mutate({
            data: formData,
            noMessage: i + 1 !== files.length,
            action: f => {
              const d: Response<IAttachmentBase> = f?.['data']
              if (files.length === 1) {
                setMainImage({ data: { photoGalleryId: gallery.id, attachmentId: d.object.id }, action: () => action(field) })
              } else {
                if (i === 0) {
                  setMainImage({ data: { photoGalleryId: gallery.id, attachmentId: d.object.id } })
                } else if (i + 1 === files.length) {
                  action(field)
                }
              }
            },
          })
        }
      }
    },
    [action, createAttachment, files, setMainImage],
  )

  const onSubmit = useCallback(
    ({ publishedDate, ...values }: Values) => {
      const offset = -(new Date().getTimezoneOffset() / 60)
      const publishDate = new Date(new Date(publishedDate).getTime() + offset * 3600 * 1000).toISOString()
      const d: Omit<CenterHistory, 'id'> = {
        publishedDate: publishDate,
        ...values,
      }
      if (detailId) {
        update.mutate({
          data: { ...d, id: Number(detailId) },
          id: detailId,
          action: v => {
            files.length > 0 ? onCreateAttachment(v) : action(v)
          },
          noMessage: files.length > 0,
        })
      } else {
        create.mutate({ data: d, action: v => onCreateAttachment(v), noMessage: true })
      }
    },
    [action, create, detailId, files, onCreateAttachment, update],
  )

  const onRemoveLocalFile = useCallback((id: number) => {
    setFiles(data => [...data].filter(item => item.id !== id))
  }, [])

  const onChange = useCallback(async (files: File[]) => {
    const tmp: MainMediaFile[] = []

    for (const file of files) {
      const url = await fileToBase64(file)
      if (typeof url === 'string') {
        tmp.push({
          id: new Date().getTime(),
          url,
          file,
          status: false,
        })
      }
    }

    setFiles(f => [...f, ...tmp])
  }, [])

  const isLoading = useMemo(
    () => create.isLoading || update.isLoading || createAttachment.isLoading,
    [create.isLoading, createAttachment.isLoading, update.isLoading],
  )

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
  }, [langError])

  useEffect(() => {
    if (detailId && data) {
      setValue('titleUz', data.titleUz)
      setValue('titleKr', data.titleKr)
      setValue('titleRu', data.titleRu)
      setValue('publishedDate', new Date(data.publishedDate).toISOString().substring(0, 16))
    }
  }, [data, detailId, setValue])

  return { form, onSubmit, isLoading, disabled, langError, onRemoveLocalFile, files, onChange, setMainImage }
}

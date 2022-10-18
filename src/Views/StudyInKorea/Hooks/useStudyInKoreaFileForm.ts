import { yupResolver } from '@hookform/resolvers/yup'
import { APP } from 'Constants/App'
import { IAttachment } from 'Entities/attachment'
import { useAttachments, useStudyInKoreaAttachment } from 'Hooks'
import { updateDialogEvent } from 'Models'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { ControllerHookProps, LangError } from 'Types/app'
import * as yup from 'yup'

type Values = Pick<IAttachment, 'fileNameUz' | 'fileNameRu' | 'fileNameKr'> & {
  file: null | File
  url: string | null
}
type Props = ControllerHookProps

export function useStudyInKoreaFileForm({ initList, extraId, detailId }: Props) {
  const {
    create,
    listQuery: { refetch },
  } = useStudyInKoreaAttachment({ initList, extraId })

  const {
    update,
    detailQuery: { data },
  } = useAttachments({ initList: false, detailId })

  const schema = yup.object().shape({
    fileNameKr: yup.string().required(APP.REQUIRED_FIELD),
    fileNameRu: yup.string().required(APP.REQUIRED_FIELD),
    fileNameUz: yup.string().required(APP.REQUIRED_FIELD),
    file: yup.mixed().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      file: null,
      fileNameKr: '',
      fileNameRu: '',
      fileNameUz: '',
      url: '',
    },
    resolver: yupResolver(schema),
  })

  const action = useCallback(() => {
    updateDialogEvent(null)
    refetch()
  }, [refetch])

  const onSubmit = useCallback(
    (values: Values) => {
      if (detailId) {
        update.mutate({
          data: {
            fileNameKr: values.fileNameKr,
            fileNameRu: values.fileNameRu,
            fileNameUz: values.fileNameUz,
          },
        })
      } else {
        if (values.file && extraId) {
          const formData = new FormData()
          formData.append('studyInKoreaId', extraId)
          formData.append('nameRu', values.fileNameRu)
          formData.append('nameKr', values.fileNameKr)
          formData.append('nameUz', values.fileNameUz)
          formData.append('multipartFile', values.file)
          create.mutate({ data: formData, action })
        }
      }
    },
    [create, action, extraId, detailId, update],
  )

  const {
    formState: { errors },
    setValue,
  } = form

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const langError: Partial<LangError> = {
    Ru: !!errors.fileNameRu?.message,
    Uz: !!errors.fileNameUz?.message,
    Kr: !!errors.fileNameKr?.message,
  }

  const isLoading = useMemo(() => create.isLoading, [create])

  const disabled = useMemo(
    () => Object.values(langError).findIndex(item => item) !== -1 || !!errors.file?.message,
    [langError, errors?.file],
  )

  useEffect(() => {
    if (detailId && data) {
      setValue('fileNameRu', data.fileNameRu)
      setValue('fileNameKr', data.fileNameKr)
      setValue('fileNameUz', data.fileNameUz)
      setValue('url', data.originalFileName)
    }
  }, [data, detailId, setValue])

  return {
    form,
    onSubmit,
    disabled,
    isLoading,
    langError,
  }
}

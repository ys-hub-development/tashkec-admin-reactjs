import { yupResolver } from '@hookform/resolvers/yup'
import { APP } from 'Constants/App'
import { NewsPath } from 'Constants/Navigation'
import { IStudyInKorea } from 'Entities/news'
import { useStudyInKorea } from 'Hooks'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApiActionParamType, ControllerHookProps, LangError } from 'Types/app'
import * as yup from 'yup'

type Values = Omit<IStudyInKorea, 'id'>
type Props = ControllerHookProps

export function useStudyInKoreaForm({ initList, detailId }: Props) {
  const navigate = useNavigate()
  const {
    create,
    update,
    detailQuery: { data },
  } = useStudyInKorea({ initList, detailId })

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    contentKr: yup.string().required(APP.REQUIRED_FIELD),
    contentRu: yup.string().required(APP.REQUIRED_FIELD),
    contentUz: yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleRu: '',
      titleUz: '',
      contentKr: '',
      contentRu: '',
      contentUz: '',
    },
    resolver: yupResolver(schema),
  })

  const action = useCallback(
    (field?: ApiActionParamType) => {
      if (!field?.['err']) {
        navigate(`/${NewsPath.main}/${NewsPath['study-in-korea']}`)
      }
    },
    [navigate],
  )

  const onSubmit = useCallback(
    (values: Values) => {
      if (detailId) {
        update.mutate({
          id: detailId,
          data: values,
          action,
        })
      } else {
        create.mutate({
          data: values,
          action,
        })
      }
    },
    [create, update, detailId, action],
  )

  const {
    formState: { errors },
    setValue,
  } = form

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const langError: Partial<LangError> = {
    Ru: !!errors.contentRu?.message || !!errors.titleRu?.message,
    Uz: !!errors.contentUz?.message || !!errors.titleUz?.message,
    Kr: !!errors.contentKr?.message || !!errors.titleKr?.message,
  }

  const disabled = useMemo(() => {
    return Object.values(langError).findIndex(item => item) !== -1
  }, [langError])

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [create, update])

  useEffect(() => {
    if (detailId && data) {
      setValue('contentKr', data.contentKr)
      setValue('contentRu', data.contentRu)
      setValue('contentUz', data.contentUz)
      setValue('titleKr', data.titleKr)
      setValue('titleRu', data.titleRu)
      setValue('titleUz', data.titleUz)
    }
  }, [detailId, setValue, data])

  return {
    form,
    onSubmit,
    isLoading,
    disabled,
    langError,
  }
}

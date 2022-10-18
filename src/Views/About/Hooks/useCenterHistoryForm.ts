import { yupResolver } from '@hookform/resolvers/yup'
import { APP } from 'Constants/App'
import { AboutPath } from 'Constants/Navigation'
import { CenterHistory } from 'Entities/about'
import { useCenterHistory } from 'Hooks'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApiActionParamType, ControllerHookProps, LangError } from 'Types/app'
import * as yup from 'yup'

type Props = ControllerHookProps
type Values = Omit<CenterHistory, 'id'>

export function useCenterHistoryForm({ detailId }: Props) {
  const navigate = useNavigate()
  const {
    update,
    create,
    detailQuery: { data },
  } = useCenterHistory({ initList: false, detailId })

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    publishedDate: yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      publishedDate: '',
      titleKr: '',
      titleRu: '',
      titleUz: '',
    },
    resolver: yupResolver(schema),
  })

  const action = useCallback(
    (field?: ApiActionParamType) => {
      if (!field?.['err']) {
        navigate(`/${AboutPath.main}/${AboutPath.history}`)
      }
    },
    [navigate],
  )

  const onSubmit = useCallback(
    ({ publishedDate, ...values }: Values) => {
      const d: Omit<CenterHistory, 'id'> = {
        publishedDate: new Date(publishedDate).toISOString(),
        ...values,
      }
      if (detailId) {
        update.mutate({ data: { ...d, id: Number(detailId) }, id: detailId, action })
      } else {
        create.mutate({ data: d, action })
      }
    },
    [action, create, detailId, update],
  )

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [create.isLoading, update.isLoading])

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

  return { form, onSubmit, isLoading, disabled, langError }
}

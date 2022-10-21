import { useTopikLevel, useTopikMaterialInfinite } from 'Hooks'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useMemo } from 'react'
import { ApiActionParamType, ControllerHookProps, IAutoCompleteOption, LangError } from 'Types/app'
import { updateDialogEvent } from 'Models'
import { ITopikLevel } from 'Entities/material'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'

type Values = Omit<ITopikLevel, 'id' | 'materialsOfTopic'> & {
  materialsOfTopic: IAutoCompleteOption | null
}
type Props = ControllerHookProps

export function useTopikLevelForm({ initList, detailId, extraId }: Props) {
  const { list } = useTopikMaterialInfinite(true)
  const {
    create,
    update,
    listQuery: { refetch },
    detailQuery: { data },
  } = useTopikLevel({
    initList,
    detailId,
    extraId,
  })

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    materialsOfTopic: yup.mixed().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleRu: '',
      titleUz: '',
      materialsOfTopic: null,
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
    [refetch],
  )

  const onSubmit = useCallback(
    ({ materialsOfTopic, ...values }: Values) => {
      const item = materialsOfTopic && list && list.find(item => item.id === materialsOfTopic.value)
      if (item) {
        if (detailId) {
          update.mutate({ id: detailId, data: { ...values, id: Number(detailId), materialsOfTopic: item }, action })
        } else {
          create.mutate({ data: { ...values, materialsOfTopic: item }, action })
        }
      }
    },
    [list, detailId, update, action, create],
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

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [create, update])

  useEffect(() => {
    if (data && detailId) {
      setValue('titleUz', data.titleUz)
      setValue('titleRu', data.titleRu)
      setValue('titleKr', data.titleKr)
      if (data.materialsOfTopic) {
        setValue('materialsOfTopic', { value: data.materialsOfTopic.id, label: data.materialsOfTopic.titleRu })
      }
    }
  }, [data, detailId, setValue])

  return {
    form,
    onSubmit,
    disabled,
    langError,
    isLoading,
  }
}

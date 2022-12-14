import { LangType } from 'Types/app'

export type LangTabListType = {
  id: LangType,
  label: string,
}

export const formLangTab: LangTabListType[] = [
  { label: 'Русский', id: 'Ru' },
  { label: 'Uzbek', id: 'Uz' },
  { label: '한국어', id: 'Kr' },
]

export const fakeHistoryList = [
  {
    id: 1,
    text: 'Аренда 3-х помещений в Ташкентском музее искусств и открытие Центра Образования Республики Корея в г.Ташкенте',
  },
  {
    id: 2,
    text: 'Решение Министерства Народного Образования Республики Корея об открытии Корейского Центра Образования в г.Ташкенте\n' +
      '10.05.1992 Вступление в должность 1-го директора Ан Де Сик ',
  },
  {
    id: 3,
    text: 'Проведение семинара по повышению квалификации преподавателей корейского языка и визит журналистов МО Кореи',
  },
  {
    id: 4,
    text: 'Подписание договора о сотрудничестве между Центром Образования Республики Корея в г. Ташкенте и Министерством Народного Образования Республики Узбекистан',
  },
  {
    id: 5,
    text: 'Подписание Меморандума о сотрудничестве с ЦССПО'
  },
  {
    id: 6,
    text: 'Проведение семинара по повышению квалификации преподавателей корейского языка и визит журналистов МО Кореи\n'
  }
]
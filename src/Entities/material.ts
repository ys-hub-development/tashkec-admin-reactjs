import { IFullContent, ITitle } from 'Entities/common'

export type ITopikMaterial = ITitle

export interface ITopikLevel extends ITopikMaterial {
  materialsOfTopic: ITopikMaterial
}

export type IStudyMaterial = IFullContent
export type AccountAuthResponse = {
  id_token: string
}

export enum UserRoleEnum {
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export type UserBasic = {
  authorities: UserRoleEnum[],
  email: string
  id: number
  login: string
  logoUrl: string | null
  firstName: null | string
  lastName: null | string
  phoneNumber: null | string
  superUser: boolean
  activated: boolean
}

import { UserBasic } from 'Entities/account'

export type AccountAuthData = {
  username: string,
  password: string
}

export type UserData = Omit<UserBasic, 'id' | 'authorities'> & {
  password: string
}
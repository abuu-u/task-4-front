import { api, getDefaultHeadersWithToken } from './api'

export interface FullUser {
  id: number
  name: string
  email: string
  status: boolean
  lastLogin: string
  created: string
}

export interface UsersResponse {
  pagesCount: number
  users: FullUser[]
}

export type Parameters = {
  page: string
  count: string
}

export const getUsers = async (page: number, count: number, token: string) =>
  fetch(`${api}/users?page=${page}&count=${count}`, {
    method: 'GET',
    headers: getDefaultHeadersWithToken(token),
  })

const createChangeUsersStatus =
  (action: 'block' | 'unblock') => (userIds: number[], token: string) =>
    fetch(`${api}/users/${action}`, {
      method: 'PUT',
      headers: getDefaultHeadersWithToken(token),
      body: JSON.stringify(userIds),
    })

export const blockUsers = createChangeUsersStatus('block')

export const unblockUsers = createChangeUsersStatus('unblock')

export const deleteUsers = (userIds: number[], token: string) => {
  return fetch(`${api}/users`, {
    method: 'DELETE',
    headers: getDefaultHeadersWithToken(token),
    body: JSON.stringify(userIds),
  })
}

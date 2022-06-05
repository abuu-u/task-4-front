import { api } from './api'

export const createUserAction =
  <T>(action: 'register' | 'login') =>
  async (data: T) => {
    return fetch(`${api}/users/${action}`, {
      method: 'POST',
      headers: {
        accepts: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

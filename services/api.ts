export interface ErrorResponse {
  message: string
}

export const api = process.env.NEXT_PUBLIC_API

export const defaultHeaders = {
  accepts: 'application/json',
  'content-type': 'application/json',
}

export const getDefaultHeadersWithToken = (token: string) => ({
  ...defaultHeaders,
  Authorization: 'Bearer ' + token,
})

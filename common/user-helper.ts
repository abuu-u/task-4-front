import { User } from '../slices/user-slice'

const nameKey = 'name'
const tokenKey = 'token'

export const setUserData = (data: User) => {
  localStorage.setItem(nameKey, data.name)
  localStorage.setItem(tokenKey, data.jwtToken)
}

export const getName = () => localStorage.getItem(nameKey)

export const getToken = () => localStorage.getItem(tokenKey)

export const removeUserData = () => {
  localStorage.removeItem(nameKey)
  localStorage.removeItem(tokenKey)
}

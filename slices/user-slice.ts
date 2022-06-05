import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setUserData } from '../common/user-helper'
import { AppDispatch } from '../lib/store'
import { ErrorResponse } from '../services/api'
import { createUserAction } from '../services/user'
import { setLoading } from './loading-slice'

export interface User {
  name: string
  jwtToken: string
}

export interface LoginData {
  email: string
  password: string
}

export type RegisterData = LoginData & {
  name: string
}

export interface UserState {
  error: string
  name?: string
}

const initialState: UserState = {
  error: '',
}

const createUserActionThunk = <T>(action: 'register' | 'login') =>
  createAsyncThunk<
    User,
    T,
    { dispatch: AppDispatch; rejectValue: ErrorResponse }
  >(`user/${action}`, async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true))

    const response = await createUserAction(action)(data)

    if (response.status !== 200) {
      const error = (await response.json()) as ErrorResponse

      dispatch(setLoading(false))

      return rejectWithValue(error)
    } else {
      const user = (await response.json()) as User

      setUserData(user)

      dispatch(setLoading(false))

      return user
    }
  })

export const registerThunk = createUserActionThunk<RegisterData>('register')

export const loginThunk = createUserActionThunk<LoginData>('login')

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    reset: () => initialState,
  },
})

export const { reset } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer

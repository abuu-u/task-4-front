import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../lib/store'

export interface LoadingsState {
  loading: boolean
}

const initialState: LoadingsState = {
  loading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',

  initialState,

  reducers: {
    reset: () => initialState,

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { reset, setLoading } = loadingSlice.actions

export const selectLoading = (state: RootState) => state.loading.loading

const loadingReducer = loadingSlice.reducer

export default loadingReducer

import { configureStore } from '@reduxjs/toolkit'
import dataRtkSlice from '../reducer/dataSlice'

export const store = configureStore({
  reducer: {
    dataRTK:dataRtkSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
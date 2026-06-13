import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RTKUser } from '../types';

interface RTKState {
  data: RTKUser[];
}

const initialState: RTKState = {
  data: [
    {
        id:1, 
        sol: "25",
        soliTavallud: "1999",
      }
  ] 
};

export const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    addRTKUser: (state, action: PayloadAction<RTKUser>) => {
      state.data.push(action.payload);
    },
    deleteRTKUser: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((u) => u.id !== action.payload);
    },
    editRTKUser: (state, action: PayloadAction<RTKUser>) => {
      state.data = state.data.map((u) => {
        if (u.id === action.payload.id) {
          return action.payload;
        }
        return u;
      });
    }
  }
});

export const { addRTKUser, deleteRTKUser, editRTKUser } = dataSlice.actions;
export default dataSlice.reducer;

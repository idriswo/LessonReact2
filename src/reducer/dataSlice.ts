import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface RtkUser {
  id:number;
  name:string;
  surname:string;
}

export interface CounterState {
  data: RtkUser[],
  name:string;
  surname:string;
  search : string;
}

const initialState: CounterState = {
  data: [
    {
        id:1,
        name:'Idris',
        surname:'Irgashev'
    },
    {
      id:2,
      name:'Ali',
      surname:'Nazarov'
    },
    {
      id:3,
      name:'Shavkat',
      surname:'Yusufzoda'
    }
  ],
  name: "",
  surname: "",
  search : ""
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    inputName:((state, action:PayloadAction<string>)=>{
        state.name = action.payload
    }),
    inputSurname:((state, action:PayloadAction<string>)=>{
        state.surname = action.payload
    }),
    deleteUserR:((state, action:PayloadAction<number>)=>{
        state.data = state.data.filter((user)=>user.id !== action.payload)
    }),
    addUser: ((state, action:PayloadAction<number>) =>{
        state.data.push({
            id:action.payload,
            name:state.name,
            surname:state.surname
        })
    }),
    editUser:((state, action:PayloadAction<number>)=>{
        state.data = state.data.map((user)=>user.id === action.payload ? {...user, name:state.name, surname:state.surname} : user)
    }),

    searchData:(state, action)=>{
        state.search = action.payload
    }
    
  },
})

export const {deleteUserR , inputName,  inputSurname, addUser, editUser, searchData} = dataSlice.actions

export default dataSlice.reducer
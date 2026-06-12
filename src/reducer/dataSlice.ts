import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Datatype {
 id:number
 name:string
 surname:string
}
export interface DataRtkState {
 dataR:Datatype[]
 nameInput:string
 surnameInput:string
 searchQuery:string
}

const initialState: DataRtkState = {
 dataR:[
    {id:1,name:"Ali",surname:"Khan"},
    {id:2,name:"Ahmad",surname:"Khan"},
    {id:3,name:"Sara",surname:"Khan"}
 ],
 nameInput: "",
 surnameInput: "",
 searchQuery: ""
 
}

export const dataRtkSlice = createSlice({
  name: 'dataR',
  initialState,
  reducers: {
   deleteData : (state , action:PayloadAction<number>)=>{
    state.dataR = state.dataR.filter((item)=> item.id !== action.payload)
   },
   addData : (state, {payload}:PayloadAction<Datatype>)=>{
    state.dataR.push(payload)
   },
   editData : (state, {payload}:PayloadAction<Datatype>)=>{
    const index = state.dataR.findIndex((item:Datatype)=> item.id == payload.id)
    if(index !== -1) {
        state.dataR[index] = payload
    }
   },
   setName : (state, {payload}:PayloadAction<string>)=>{
    state.nameInput = payload
   },
   setSurname : (state, {payload}:PayloadAction<string>)=>{
    state.surnameInput = payload
   },
   setSearch : (state, {payload}:PayloadAction<string>)=>{
    state.searchQuery = payload
   },
   resetReduxInputs : (state)=>{
    state.nameInput = ""
    state.surnameInput = ""
   }
      
  },
})

export const { deleteData, addData, editData, setName, setSurname, setSearch, resetReduxInputs } = dataRtkSlice.actions

export default dataRtkSlice.reducer
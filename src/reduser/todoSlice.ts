import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const api = "https://to-dos-api.softclub.tj/api/to-dos"

export interface TodoState {
    data: any[]
    isLoading: boolean
    error: boolean
}

const initialState: TodoState = {
    data: [],
    isLoading: false,
    error: false
}
export const getData = createAsyncThunk("todo/getData", async () => {
    try {
        const { data } = await axios.get(api)
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const deleteData = createAsyncThunk("todo/deleteData",async(id:string)=>{
    try{
        await axios.delete(`${api}?id=${id}`)
        return id
    }catch(error){
        console.error(error)
    }
})

export const addData = createAsyncThunk("todo/addData",async(data:object)=>{
    try{
        const res = await axios.post(api,data)
        return res.data.data
    }catch(error){
        console.error(error)
    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state,{ payload }) => {
            state.isLoading=true
            state.error=false
        })
        builder.addCase(getData.fulfilled, (state, { payload }) => {
            state.data = payload
            state.isLoading=false
            state.error=false
        })
        builder.addCase(getData.rejected, (state, { payload }) => {
            state.isLoading=false
            state.error=true
        })
        
        builder.addCase(deleteData.pending, (state,{ payload }) => {
            state.isLoading=true
            state.error=false
        })

        builder.addCase(deleteData.fulfilled, (state, { payload }) => {
            state.data = state.data.filter((el)=> el.id !== payload)
            state.isLoading=false
            state.error=false
        })
        builder.addCase(deleteData.rejected, (state, { payload }) => {
            state.isLoading=false
            state.error=true
        })



        builder.addCase(addData.pending, (state,{ payload }) => {
            state.isLoading=true
            state.error=false
        })

        builder.addCase(addData.fulfilled, (state, { payload }) => {
            state.data = [...state.data,payload]
            state.isLoading=false
            state.error=false
        })
        builder.addCase(addData.rejected, (state, { payload }) => {
            state.isLoading=false
            state.error=true
        })
    }
    
})

export const { } = todoSlice.actions

export default todoSlice.reducer
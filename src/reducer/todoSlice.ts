import { createSlice } from "@reduxjs/toolkit";


export interface data {
    id: number,
    title: string,
    description: string,
}

export interface TodoState {
    data: data[],
}

const initialState: TodoState = {
    data: [
        {
            id: 1,
            title: "idris",
            description: "nnnnnnnnnnnnn",
        },
        {
            id: 2,
            title: "sodiq",
            description: "nnnnnnnnnnn",
        }
    ],
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, { payload }) => {
            state.data.push(payload);
        },
        editTodo: (state, { payload }) => {
            const index = state.data.findIndex((el) => el.id === payload.id);
            if (index !== -1) {
                state.data[index] = payload;
            }
        },
        deleteTodo:(state ,{payload})=>{
            state.data = state.data.filter((el)=>el.id !== payload )
        },
        
    },
})

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions


export default todoSlice.reducer
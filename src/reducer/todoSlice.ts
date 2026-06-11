import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface data {
    id: number,
    title: string,
    description: string,
}

export interface TodoState {
    data: data[],
    title: string,
    description: string,
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
    title: "",
    description: "",
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        
        deleteTodo:(state ,{payload}: PayloadAction<number>)=>{
            state.data = state.data.filter((el)=>el.id !== payload )
        },
        inputTodo: (state, { payload }: PayloadAction<{ key: 'title' | 'description', value: string }>) => {
            state[payload.key] = payload.value;
        },
        addTodo: (state) => {
            state.data.push({
                id: Date.now(),
                title: state.title,
                description: state.description,
            });
            state.title = '';
            state.description = '';
        },
        editTodo: (state, { payload }: PayloadAction<number>) => {
            state.data = state.data.map((el) => {
                if (el.id === payload) {
                    return { 
                        id: payload,
                        title: state.title,
                        description: state.description,
                    }
                }
                return el
            });
            state.title = "";
            state.description = "";
        }
    },
})

export const { deleteTodo, inputTodo, addTodo, editTodo } = todoSlice.actions


export default todoSlice.reducer
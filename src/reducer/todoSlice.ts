import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ToDo {
  id: number;
  name: string;
  description: string;
  images?: string[];
  isCompleted?: boolean;
}

export interface TodoState {
  todos: ToDo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Ҳамаи инҳо акнун синхронӣ мебошанд
    setTodos: (state, action: PayloadAction<ToDo[]>) => {
      state.todos = action.payload;
    },
    addTodoSync: (state, action: PayloadAction<ToDo>) => {
      state.todos.push(action.payload);
    },
    updateTodoSync: (state, action: PayloadAction<ToDo>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
      }
    },
    deleteTodoSync: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodoSync: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index].isCompleted = true;
      }
    },
  },
});

export const { setTodos, addTodoSync, updateTodoSync, deleteTodoSync, completeTodoSync } = todoSlice.actions;

export default todoSlice.reducer;
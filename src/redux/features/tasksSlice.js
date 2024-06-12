import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      state.tasks[index].completed = !state.tasks[index].completed;
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[index] = { ...state.tasks[index], ...action.payload };
    },
  },
});

export const { addTask, removeTask, editTask, toggleComplete } = tasksSlice.actions;

export default tasksSlice.reducer;

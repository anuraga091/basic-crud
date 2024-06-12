import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generatorFunctions';

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
      prepare(title, description) {
        return {
          payload: {
            id: generateId(),
            title,
            description,
          },
        };
      },
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[index] = { ...state.tasks[index], ...action.payload };
    },
  },
});

export const { addTask, removeTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;

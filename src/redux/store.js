import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../redux/features/tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
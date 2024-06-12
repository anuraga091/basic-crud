import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../redux/features/tasksSlice';

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch(e) {
    console.log(e);
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch(e) {
    console.log(e);
    return undefined;
  }
}


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: loadFromLocalStorage(),
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().tasks);
});


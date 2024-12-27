import { configureStore } from '@reduxjs/toolkit';
import { AppState } from '../types/state';
import { isLoadingSlice, mountainDaysSlice } from './reducer';

// export const initialState: AppState = {
//   mountainDaysData: [],
//   isLoading: false,
// };

export const store = configureStore({
  reducer: {
    mountainDaysData: mountainDaysSlice.reducer,
    isLoading: isLoadingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

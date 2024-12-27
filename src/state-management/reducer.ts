import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MountainDay } from '../types/mountain-day';

interface MountainDaysSliceState {
  mountainDays: MountainDay[];
  fetchOccured: boolean;
  showNewRow: boolean;
}

const initialState: MountainDaysSliceState = {
  mountainDays: [],
  fetchOccured: false,
  showNewRow: false,
};

export const mountainDaysSlice = createSlice({
  name: 'mountainDays',
  initialState: initialState,
  reducers: {
    addMountainDayAction: (state, action: PayloadAction<MountainDay>) => {
      state.mountainDays = [...state.mountainDays, action.payload];
    },
    fetchMountainDaysDataAction: (
      state,
      action: PayloadAction<MountainDay[]>
    ) => {
      state.mountainDays = action.payload;
      state.fetchOccured = true;
    },
    showNewRowAction: (state, action: PayloadAction<boolean>) => {
      state.showNewRow = action.payload;
    },
  },
});

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    toggleIsLoadingAction: (state, action: PayloadAction<boolean>) =>
      (state = action.payload),
  },
});

export const {
  addMountainDayAction,
  fetchMountainDaysDataAction,
  showNewRowAction,
} = mountainDaysSlice.actions;
export const { toggleIsLoadingAction } = isLoadingSlice.actions;
// export default mountainDaysSlice.reducer;

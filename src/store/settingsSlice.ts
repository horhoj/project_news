import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME = 'settingsSlice';

interface IS {
  isNavMenuOpen: boolean;
}

const initialState: IS = {
  isNavMenuOpen: false,
};

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsNavMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavMenuOpen = action.payload;
    },
  },
});

export const settingsReducer = reducer;

export const settingsSlice = { actions } as const;

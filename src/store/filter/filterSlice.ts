import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilter {
  title: string;
  body: string;
}

const initialState = {
  title: '',
  body: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload;
    },
    setBody: (state, { payload }: PayloadAction<string>) => {
      state.body = payload;
    },
  },
});

export const { actions: filterActions, reducer: filterReducer } = filterSlice;

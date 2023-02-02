import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from '@redux-saga/core';
import postSaga from './posts/sagas';
import { postsReducer } from './posts/postsSlice';
import { filterReducer } from './filter/filterSlice';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    filters: filterReducer,
  },
  middleware: [saga],
});

saga.run(postSaga);

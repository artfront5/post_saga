import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from '@redux-saga/core';
import postSaga from './posts/sagas';
import { postsReducer } from './posts/postsSlice';
import { usersReducer } from './users/usersSlice';
import userSaga from './users/sagas';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  middleware: [saga],
});

saga.run(postSaga);
saga.run(userSaga);

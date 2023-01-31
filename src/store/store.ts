import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";
import postSaga from "./posts/sagas";
import { postsReducer } from "./posts/postsSlice";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: [saga],
});

saga.run(postSaga);

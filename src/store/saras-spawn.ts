import { spawn } from "redux-saga/effects";
import postSaga from "./posts/sagas";
import userSaga from "./users/sagas";
import { SagaIterator } from "redux-saga";

export function* rootSaga(): SagaIterator {
  yield spawn(postSaga);
  yield spawn(userSaga);
}

export default rootSaga;

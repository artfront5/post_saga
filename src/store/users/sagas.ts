import { usersActions, IUsers } from './usersSlice';
import { takeEvery, put, call } from 'redux-saga/effects';

type fetchUsersFnType = () => Promise<IUsers>;

const fetchUsers: fetchUsersFnType = async () => {
  return fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());
};

function* workGetUsersFetch() {
  const users: Array<IUsers> = yield call(fetchUsers);
  yield put(usersActions.setUsers(users));
}

function* userSaga() {
  yield takeEvery(usersActions.getUsers, workGetUsersFetch);
}

export default userSaga;

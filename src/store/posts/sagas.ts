import { takeEvery } from "redux-saga/effects";
import { IPost, postsActions } from "./postsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { IPostOmitted } from "./post.types";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";

type fetchPostsFnType = () => Promise<IPost>;
type addPostsFnType = (data: IPostOmitted) => Promise<IPost>;
type removePostsFnType = (id: number) => Promise<IPost>;

// воркер и функция для запроса
const fetchPosts: fetchPostsFnType = async () => {
  return fetch("https://jsonplaceholder.typicode.com/posts?_limit=3").then(
    (res) => res.json()
  );
};
function* workGetPostsFetch() {
  const posts: Array<IPost> = yield call(fetchPosts);
  yield put(postsActions.setPosts(posts));
}

// воркер и функция для создания поста
const addPost: addPostsFnType = async (data) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};

function* workAddPost({ payload }: PayloadAction<IPostOmitted>): SagaIterator {
  const post: IPost = yield call(addPost, payload);
  yield put(postsActions.addPost(post));
}

// воркер и функция для создания поста
const removePosts: removePostsFnType = async (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

function* workRemovePost({
  payload,
}: PayloadAction<{ id: number }>): SagaIterator {
  const { id } = payload;
  yield call(removePosts, id);

  yield put(postsActions.removePosts({ id }));
}

//воркер и функция для редактирования поста
const replacePosts: removePostsFnType = async (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};

function* workReplace() {
  const post: IPost = yield call(replacePosts, payload);
  yield put(postsActions.replacePosts(post));
}

// вотчер для всего
function* postSaga() {
  yield takeEvery(postsActions.getPosts, workGetPostsFetch);
  yield takeEvery(postsActions.reqAddPost, workAddPost);
  yield takeEvery(postsActions.reqRemovePosts, workRemovePost);
  yield takeEvery(postsActions.reqReplacePosts, workReplace);
}

export default postSaga;

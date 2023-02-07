import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostOmitted, IRemovePost } from "./post.types";

export interface IPost {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface IFilter {
  title: string;
  body: string;
}

export interface IStatus {
  REQUEST_COMPLETED: boolean;
}

const postDefaultValues = { body: "", title: "", userId: 1 };

const filtersDefaultValues = { title: "", body: "" };

const statusType = { REQUEST_COMPLETED: false };

interface IPostState {
  posts: Array<IPost>;
  currentElement: IPost;
  filter: IFilter;
  status: IStatus;
}

const initialState: IPostState = {
  posts: [],
  currentElement: postDefaultValues,
  filter: filtersDefaultValues,
  status: statusType,
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // reducer для получения данных GET
    getPosts: () => {},
    setPosts: (state, action: PayloadAction<Array<IPost>>) => {
      state.posts = action.payload;
    },

    setCurrentElement: (state, { payload }: PayloadAction<IPost>) => {
      state.currentElement = payload;
    },

    //reducer для отправки данных POST
    reqAddPost: (_, { payload }: PayloadAction<IPostOmitted>) => {},
    addPost: (state, { payload }: PayloadAction<IPost>) => {
      state.posts.push(payload);
      state.currentElement = postDefaultValues;
    },

    //reducer для отправки данных DELETE
    reqRemovePosts: (state, { payload }: PayloadAction<number>) => {},
    removePosts: (state, { payload: id }: PayloadAction<number>) => {
      const index = state.posts.findIndex((post) => post.id === id);
      state.posts.splice(index, 1);
    },

    //reducer для редактирования данных PUT
    reqEditPost: (state, { payload }: PayloadAction<IPost>) => {},
    editPost: (state, { payload }: PayloadAction<IPost>) => {
      const post = state.posts.find((post) => post.id === payload.id);
      if (post) {
        post.title = payload.title;
        post.body = payload.body;
      }
      state.status.REQUEST_COMPLETED = true;
    },

    // reducer для фильтров
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.filter.title = payload;
    },
    setBody: (state, { payload }: PayloadAction<string>) => {
      state.filter.body = payload;
    },
  },
});

export const { actions: postsActions, reducer: postsReducer } = postsSlice;

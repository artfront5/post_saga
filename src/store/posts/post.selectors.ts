import { RootStore } from '../types';

export const getCurrentElement = (store: RootStore) => store.posts.currentElement;

export const getFilterPosts = (store: RootStore) => store.posts.filter;
export const getPosts = (store: RootStore) => store.posts.posts;

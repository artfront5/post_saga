import { RootStore } from "../types";

export const getCurrentElement = (store: RootStore) =>
  store.posts.currentElement;

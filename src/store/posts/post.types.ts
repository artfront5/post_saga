import { IPost } from "./postsSlice";

export type IPostOmitted = Omit<IPost, "id">;

export type IRemovePost = Pick<IPost, "id">;

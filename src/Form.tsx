import React from "react";
import { useAppDispatch, useStateSelector } from "./store/hooks";
import { IPost, postsActions } from "./store/posts/postsSlice";
import "./App.css";
import { getCurrentElement } from "./store/posts/post.selectors";

export default function Form() {
  const dispatch = useAppDispatch();
  const post = useStateSelector(getCurrentElement);

  function handlerAddPost() {
    dispatch(
      postsActions.reqAddPost({
        title: post.title,
        body: post.body,
        userId: 1,
      })
    );
  }

  const setValue = (fieldName: keyof IPost) => {
    return <T extends IPost[keyof IPost]>(value: T) => {
      dispatch(postsActions.setCurrentElement({ ...post, [fieldName]: value }));
    };
  };

  return (
    <div className="addPostBox">
      <button className="buttonPostHidden" onClick={handlerAddPost}>
        новый пост
      </button>
      <input
        value={post.title}
        onChange={(e) => setValue("title")(e.target.value)}
        placeholder="title"
      />
      <input
        value={post.body}
        onChange={(e) => setValue("body")(e.target.value)}
        placeholder="body"
      />
      <hr />
    </div>
  );
}

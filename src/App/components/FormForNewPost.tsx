import React from "react";

import { useAppDispatch, useStateSelector } from "../../store/hooks";
import { IPost, postsActions } from "../../store/posts/postsSlice";
import { getCurrentElement } from "../../store/posts/post.selectors";
import { useNavigate, useParams } from "react-router-dom";

export function FormForNewPost() {
  const dispatch = useAppDispatch();
  const post = useStateSelector(getCurrentElement);

  const history = useNavigate();

  const { id } = useParams();

  // функция setValue c аргументами какого-либо ключа объекта IPost
  const setValue = (fieldName: "title" | "body") => {
    // T дженерик сложный, который наследует любой из типов значений в объекте IPost по его ключам (string, number или undefined)
    return <T extends IPost[keyof IPost]>(value: T) => {
      dispatch(postsActions.setCurrentElement({ ...post, [fieldName]: value }));
    };
  };

  function handlerAddPost() {
    dispatch(
      postsActions.reqAddPost({
        title: post.title,
        body: post.body,
        userId: 1,
      })
    );
    history("/posts");
  }

  return (
    <div className="addPostBox">
      {id}
      <input
        className="inputNew"
        value={post.title}
        onChange={(e) => setValue("title")(e.target.value)}
        placeholder="title"
      />
      <input
        className="inputNew"
        value={post.body}
        onChange={(e) => setValue("body")(e.target.value)}
        placeholder="body"
      />
      <button onClick={handlerAddPost}>новый пост</button>
    </div>
  );
}

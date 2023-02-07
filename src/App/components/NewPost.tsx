import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useStateSelector } from "../../store/hooks";
import { getCurrentElement } from "../../store/posts/post.selectors";
import { IPost, postsActions } from "../../store/posts/postsSlice";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const dispatch = useAppDispatch();
  const post = useStateSelector(getCurrentElement);
  const { id } = useParams();

  const navigate = useNavigate();

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
    navigate("/posts");
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

export default NewPost;

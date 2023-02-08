import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useStateSelector } from "../../store/hooks";
import {
  getCurrentElement,
  getRequestStatus,
} from "../../store/posts/post.selectors";
import { IPost, postsActions } from "../../store/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { InputField } from "./common/InputField";

function NewPost() {
  const dispatch = useAppDispatch();
  const post = useStateSelector(getCurrentElement);
  const { id } = useParams();
  const status = useStateSelector(getRequestStatus);
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
  }

  React.useEffect(() => {
    if (status === "succses") {
      navigate("/posts");
      dispatch(postsActions.setStatus({ status: "unsetted" }));
    }
  }, [dispatch, status]);

  return (
    <div className="addPostBox">
      <InputField
        inputClassName="textarea"
        value={post.title}
        placeholder="save title"
        onChange={(e) => setValue("title")(e.target.value)}
      />
      <InputField
        inputClassName="textarea1"
        value={post.body}
        placeholder="save title"
        onChange={(e) => setValue("body")(e.target.value)}
      />
      <button
        onClick={handlerAddPost}
        className="waves-effect waves-light btn-small green"
      >
        <i className="material-icons right">save</i>new post
      </button>
    </div>
  );
}

export default NewPost;

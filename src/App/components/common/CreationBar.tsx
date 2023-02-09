import React from "react";
import { useAppDispatch, useStateSelector } from "../../../store/hooks";
import { IPost, postsActions } from "../../../store/posts/postsSlice";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { InputField } from "./InputField";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getCurrentElement,
  getRequestStatus,
} from "../../../store/posts/post.selectors";

export const CreationBar = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { postId } = useParams<{ postId: string }>();

  const status = useStateSelector(getRequestStatus);

  React.useEffect(() => {
    const id = postId !== undefined && +postId > 0 ? +postId : -1;
    dispatch(postsActions.setCurrentElementById({ id }));
  }, [postId]);

  function savePost() {
    dispatch(
      postsActions.reqEditPost({
        title: post.title,
        body: post.body,
        userId: post!.userId,
        id: post!.id,
      })
    );
  }

  const post = useStateSelector(getCurrentElement);

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
  const isEditMode = post?.id !== undefined;

  React.useEffect(() => {
    if (status === "succses") {
      navigate("/posts");
      dispatch(postsActions.setStatus({ status: "unsetted" }));
    }
  }, [dispatch, status]);

  if (!post) {
    return <p>No post</p>;
  }

  return (
    <div className="addPostBox">
      <InputField
        inputClassName="textarea"
        value={post.title}
        placeholder="title"
        onChange={(e) => setValue("title")(e.target.value)}
      />

      <InputField
        inputClassName="textarea1"
        value={post.body}
        placeholder="body"
        onChange={(e) => setValue("body")(e.target.value)}
      />

      {isEditMode ? (
        <Button
          onClick={savePost}
          buttonClassName={"waves-effect waves-light btn-small green"}
        >
          {"save"}
          {<Icon iconClassName={"material-icons right"}>{"save"}</Icon>}
        </Button>
      ) : (
        <Button
          onClick={handlerAddPost}
          buttonClassName={"waves-effect waves-light btn-small green"}
        >
          {"new post"}
          {<Icon iconClassName={"material-icons right"}>{"save"}</Icon>}
        </Button>
      )}
    </div>
  );
};

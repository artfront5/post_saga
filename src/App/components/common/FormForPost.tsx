import React from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useStateSelector } from "../../../store/hooks";
import { postsActions } from "../../../store/posts/postsSlice";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { InputField } from "./InputField";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getRequestStatus } from "../../../store/posts/post.selectors";

export const FormForPost = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { postId } = useParams();

  const status = useStateSelector(getRequestStatus);
  const post = useStateSelector((state) =>
    state.posts.posts.find((el) => el.id === +postId!)
  );

  const [title, setSaveTitle] = React.useState(post?.title || "");
  const [body, setSaveBody] = React.useState(post?.body || "");

  function savePost() {
    dispatch(
      postsActions.reqEditPost({
        title,
        body,
        userId: post!.userId,
        id: post!.id,
      })
    );
  }

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
        value={title}
        onChange={(e) => setSaveTitle(e.target.value)}
        placeholder={"edit title"}
        inputClassName={"textarea"}
      />
      <InputField
        inputClassName={"textarea1"}
        value={body}
        onChange={(e) => setSaveBody(e.target.value)}
        placeholder={"edit body"}
      />
      <Button
        onClick={savePost}
        buttonClassName={"waves-effect waves-light btn-small green"}
      >
        {"save"}
        {<Icon iconClassName={"material-icons right"}>{"save"}</Icon>}
      </Button>
    </div>
  );
};
